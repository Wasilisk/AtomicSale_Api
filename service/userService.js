const bcrypt = require('bcrypt')
const uuid = require('uuid')
const {User, Basket} = require('../models/models')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const BasketService = require('./basketService')
const UserDto = require('../dtos/userDto')
const ApiError = require('../error/ApiError')

class UserService {
    async registration(email, password, role = "USER") {
        const candidate = await User.findOne({where:{email}});
        if(candidate) {
            throw ApiError.badRequest(`Користувач з поштовим адресом ${email} вже існує`);
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const activationLink = uuid.v4();

        const user = await User.create({email, role, activation_link: activationLink, password: hashPassword, });
        const basket = await BasketService.createBasket(user.id);
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await User.findOne({where:{activation_link: activationLink}});
        if(!user) {
            throw new Error('Incorrect activation link');
        }
        user.is_activated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({where: {email}});
        if(!user) {
            throw ApiError.badRequest('Користувач з таким email не знайдений');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) {
            throw ApiError.badRequest('Невірний пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnautorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb) {
            throw ApiError.UnautorizedError();
        }
        const user = await User.findOne({where: {id: userData.id}});
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...user});
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService();