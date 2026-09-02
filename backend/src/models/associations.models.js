import User from "./user.models.js";
import Store from "./store.models.js";
import Rating from "./rating.models.js";


User.hasOne(Store, {
  foreignKey: "ownerId",
  as: "store",
});

Store.belongsTo(User, {
  foreignKey: "ownerId",
  as: "owner",
});


User.hasMany(Rating, {
  foreignKey: "userId",
  as: "ratings",
});

Rating.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});


Store.hasMany(Rating, {
  foreignKey: "storeId",
  as: "ratings",
});

Rating.belongsTo(Store, {
  foreignKey: "storeId",
  as: "store",
});