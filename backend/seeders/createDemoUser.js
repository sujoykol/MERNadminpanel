// scripts/createDemoUser.js
const bcrypt = require("bcryptjs");
const { sequelize, User } = require("../models");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB Connected");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const [user, created] = await User.findOrCreate({
      where: { email: "admin@admin.com" },
      defaults: {
        password: hashedPassword,
      },
    });

    if (created) {
      console.log("✅ Demo user created:");
    } else {
      console.log("ℹ️ Demo user already exists:");
    }

    console.log({
      email: user.email,
      password: "admin123",
    });

    process.exit();
  } catch (error) {
    console.error("❌ Failed to create demo user:", error);
    process.exit(1);
  }
})();
