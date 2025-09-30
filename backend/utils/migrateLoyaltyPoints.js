import mongoose from 'mongoose';
import User from '../models/userModel.js';
import { connectDB } from '../config/db.js';
import 'dotenv/config';

/**
 * Migration script to add loyalty points to existing users
 * Run this once to give all existing users 500 initial points
 */
const migrateLoyaltyPoints = async () => {
  try {
    console.log('🚀 Starting loyalty points migration...');
    
    // Connect to database
    await connectDB();
    console.log('✅ Connected to database');

    // Find all users without loyalty points
    const usersToUpdate = await User.find({
      $or: [
        { loyaltyPoints: { $exists: false } },
        { loyaltyPoints: { $eq: null } },
        { totalPointsEarned: { $exists: false } }
      ]
    });

    console.log(`📊 Found ${usersToUpdate.length} users to update`);

    if (usersToUpdate.length === 0) {
      console.log('✅ All users already have loyalty points');
      return;
    }

    // Update users with initial loyalty points
    const updateResult = await User.updateMany(
      {
        $or: [
          { loyaltyPoints: { $exists: false } },
          { loyaltyPoints: { $eq: null } },
          { totalPointsEarned: { $exists: false } }
        ]
      },
      {
        $set: {
          loyaltyPoints: 500,
          totalPointsEarned: 500,
          achievements: [{
            id: 'legacy_welcome',
            name: 'Loyalty Program Member',
            unlockedAt: new Date()
          }],
          rewardHistory: []
        }
      }
    );

    console.log(`✅ Updated ${updateResult.modifiedCount} users with 500 loyalty points`);
    console.log('🎉 Migration completed successfully!');

    // Show some stats
    const totalUsers = await User.countDocuments();
    const usersWithPoints = await User.countDocuments({ loyaltyPoints: { $gte: 0 } });
    
    console.log(`📈 Summary:`);
    console.log(`   Total users: ${totalUsers}`);
    console.log(`   Users with loyalty points: ${usersWithPoints}`);
    console.log(`   Coverage: ${((usersWithPoints / totalUsers) * 100).toFixed(1)}%`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateLoyaltyPoints();
}

export default migrateLoyaltyPoints;