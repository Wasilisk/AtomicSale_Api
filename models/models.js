const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, require: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    is_activated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activation_link: {type: DataTypes.STRING}
})

const UserToken = sequelize.define('user_token', {
    refresh_token: {type: DataTypes.STRING, require: true}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const ProductReview = sequelize.define('rating_review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    message: {type: DataTypes.STRING, allowNull: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}
})

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    general_information: {type: DataTypes.STRING, allowNull: false},
    features: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false}
})

User.hasOne(UserToken)
UserToken.belongsTo(User)

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(ProductReview)
ProductReview.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Category.hasMany(Product)
Product.belongsTo(Category)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(ProductReview)
ProductReview.belongsTo(Product)

Product.hasOne(ProductInfo)
ProductInfo.belongsTo(Product)

Product.hasMany(ProductReview)
ProductReview.belongsTo(Product)

module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    ProductInfo,
    ProductReview,
    Category,
    UserToken
}