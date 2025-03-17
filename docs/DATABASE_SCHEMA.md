# Database Schema

This document outlines the database schema for SocialGuardian, detailing the collections/tables, their fields, relationships, and indexing strategies.

## Overview

SocialGuardian uses MongoDB as its primary database for flexible document storage. The schema is designed around these core entities:

- Users
- Social Accounts
- Content
- Campaigns
- Analytics
- Followers
- Influencers
- Transactions

## Schema Definitions

### Users Collection

Stores user account information and platform preferences.

```javascript
{
  _id: ObjectId,
  email: String,                  // Unique, indexed
  passwordHash: String,
  firstName: String,
  lastName: String,
  companyName: String,
  industry: String,
  planType: String,               // 'free', 'pro', 'vip', 'elite'
  planExpiry: Date,
  createdAt: Date,
  lastLoginAt: Date,
  profileImageUrl: String,
  phoneNumber: String,            // Optional
  timezone: String,
  preferences: {
    emailNotifications: Boolean,
    pushNotifications: Boolean,
    weeklyReport: Boolean,
    theme: String,
    language: String
  },
  apiUsage: {
    currentPeriodCalls: Number,
    lastResetDate: Date
  },
  isVerified: Boolean,
  isTwoFactorEnabled: Boolean,
  refreshToken: String,
  socialAccountIds: [ObjectId],   // References to SocialAccounts
  stripeCustomerId: String        // For payment processing
}
```

### SocialAccounts Collection

Represents connected social media accounts.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,               // Reference to Users
  platform: String,               // 'instagram', 'facebook', 'twitter', etc.
  handle: String,
  displayName: String,
  profileUrl: String,
  profileImageUrl: String,
  accessToken: String,            // Encrypted
  refreshToken: String,           // Encrypted
  tokenExpiryDate: Date,
  followerCount: Number,
  followingCount: Number,
  postCount: Number,
  isBusinessAccount: Boolean,
  categoryName: String,
  isVerified: Boolean,
  connectionStatus: String,       // 'active', 'expired', 'revoked'
  lastSyncAt: Date,
  insights: {
    avgEngagement: Number,
    avgImpressions: Number,
    topPerformingContentType: String,
    audienceDemographics: Object
  },
  metaData: Object,               // Platform-specific data
  hasBackup: Boolean              // Indicates if follower backup exists
}
```

### Content Collection

Stores content items (posts, stories, etc.) with their metadata.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,               // Reference to Users
  socialAccountId: ObjectId,      // Reference to SocialAccounts
  campaignId: ObjectId,           // Optional, reference to Campaigns
  contentType: String,            // 'post', 'story', 'reel', 'carousel'
  status: String,                 // 'draft', 'scheduled', 'published', 'failed'
  mediaUrls: [String],            // Array of media file URLs
  caption: String,
  hashtags: [String],
  mentions: [String],
  location: {
    name: String,
    id: String
  },
  scheduledFor: Date,             // When the post is scheduled
  publishedAt: Date,              // When the post was actually published
  createdAt: Date,
  updatedAt: Date,
  postUrl: String,                // URL to the published post
  contentId: String,              // ID returned by the social platform
  performance: {
    likes: Number,
    comments: Number,
    shares: Number,
    saves: Number,
    impressions: Number,
    reach: Number,
    engagementRate: Number
  },
  aiGenerated: Boolean,           // Indicates if content was AI-generated
  aiPrompt: String,               // If AI-generated, the prompt used
  tags: [String],                 // For content organization
  isArchived: Boolean
}
```

### Campaigns Collection

Represents marketing campaigns with multiple content pieces.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,               // Reference to Users
  name: String,
  description: String,
  objectives: [String],
  startDate: Date,
  endDate: Date,
  status: String,                 // 'planning', 'active', 'completed', 'paused'
  platforms: [String],            // Targeted platforms
  budget: Number,                 // Optional
  currency: String,
  target: {
    audience: Object,
    metrics: Object,
    locations: [String]
  },
  contentIds: [ObjectId],         // References to Content
  influencerIds: [ObjectId],      // References to Influencers
  kpis: {
    impressions: Number,
    engagementRate: Number,
    conversions: Number,
    costPerEngagement: Number,
    roi: Number
  },
  themeSettings: {
    colorPalette: [String],
    moodBoard: [String],          // URLs to mood board images
    fontStyle: String,
    visualStyle: String
  },
  notes: String,
  tags: [String],
  isTemplate: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### FollowerBackups Collection

Stores follower data for account recovery purposes.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,               // Reference to Users
  socialAccountId: ObjectId,      // Reference to SocialAccounts
  backupDate: Date,
  followerCount: Number,
  encryptedFollowerData: String,  // Encrypted JSON containing follower info
  encryptionKeyId: String,        // Reference to encryption key in secure storage
  checksum: String,               // To verify data integrity
  differentialBackup: Boolean,    // Whether this is a differential backup
  baseBackupId: ObjectId,         // Reference to base backup if differential
  status: String,                 // 'complete', 'in_progress', 'failed'
  expiryDate: Date,               // When this backup expires (data retention)
  metaData: Object                // Additional backup information
}
```

### Analytics Collection

Stores aggregated analytics data.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,               // Reference to Users
  socialAccountId: ObjectId,      // Reference to SocialAccounts
  period: String,                 // 'daily', 'weekly', 'monthly'
  startDate: Date,
  endDate: Date,
  followerMetrics: {
    growth: Number,
    netChange: Number,
    churnRate: Number,
    demographicChanges: Object
  },
  contentMetrics: {
    totalPosts: Number,
    avgEngagementRate: Number,
    bestPerformingContentId: ObjectId,
    worstPerformingContentId: ObjectId,
    engagementByContentType: Object,
    engagementByTimeOfDay: Object,
    topHashtags: [Object]
  },
  audienceInsights: {
    activeHours: Object,
    topLocations: [Object],
    ageDistribution: Object,
    genderDistribution: Object,
    interestCategories: [Object]
  },
  competitorComparison: {
    relativeGrowth: Number,
    relativeEngagement: Number,
    shareOfVoice: Number
  },
  generatedInsights: [String],    // AI-generated actionable insights
  createdAt: Date
}
```

### Influencers Collection

Stores influencer profiles for the marketplace.

```javascript
{
  _id: ObjectId,
  displayName: String,
  handleByPlatform: {             // Handles on different platforms
    instagram: String,
    tiktok: String,
    youtube: String,
    // other platforms
  },
  email: String,                  // Optional, for communication
  category: [String],             // E.g., 'fashion', 'fitness'
  audience: {
    size: Number,
    demographics: Object,
    locations: [Object],
    interests: [String]
  },
  engagementMetrics: {
    avgEngagementRate: Number,
    avgViews: Number,
    avgComments: Number
  },
  contentTypes: [String],         // E.g., 'photos', 'videos', 'reels'
  pricing: {
    post: Number,
    story: Number,
    reel: Number,
    video: Number
  },
  currency: String,
  pastCampaigns: [Object],        // Previous work examples
  bio: String,
  profileImageUrl: String,
  isVerified: Boolean,            // Verified by platform
  isPlatformVerified: Boolean,    // Verified by our platform
  rating: Number,                 // Based on client feedback
  availability: String,           // 'available', 'limited', 'booked'
  joinedAt: Date,
  lastUpdated: Date,
  tags: [String],
  contactPreference: String
}
```

### Transactions Collection

Records all financial transactions within the platform.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,               // Reference to Users
  type: String,                   // 'subscription', 'influencer_payment', etc.
  amount: Number,
  currency: String,
  status: String,                 // 'pending', 'completed', 'failed', 'refunded'
  paymentMethod: String,
  transactionDate: Date,
  description: String,
  relatedEntityType: String,      // E.g., 'campaign', 'subscription'
  relatedEntityId: ObjectId,      // Reference to the related entity
  stripeTransactionId: String,    // Reference to payment processor ID
  receiptUrl: String,
  billingDetails: Object,
  metadata: Object
}
```

## Indexes

### Users Collection
- `email`: Unique index
- `planExpiry`: Index for subscription checks
- `stripeCustomerId`: Index for payment operations

### SocialAccounts Collection
- `userId`: Index for quick lookup of user's accounts
- `platform, handle`: Compound index for unique platform+handle combinations
- `lastSyncAt`: Index for synchronization operations

### Content Collection
- `userId, socialAccountId`: Compound index for filtering user's content per account
- `campaignId`: Index for campaign content lookups
- `scheduledFor`: Index for scheduler operations
- `status`: Index for filtering by content status

### Campaigns Collection
- `userId`: Index for user's campaigns
- `status, startDate, endDate`: Compound index for active campaign checks

### FollowerBackups Collection
- `userId, socialAccountId`: Compound index for user account backups
- `backupDate`: Index for backup history
- `expiryDate`: Index for backup retention management

### Analytics Collection
- `userId, socialAccountId, period, startDate`: Compound index for analytics queries
- `startDate, endDate`: Index for date range queries

### Influencers Collection
- `category`: Index for category-based searches
- `audience.size`: Index for filtering by audience size
- `audience.locations`: Index for geographic searches
- `engagementMetrics.avgEngagementRate`: Index for sorting by engagement

### Transactions Collection
- `userId`: Index for user's transaction history
- `transactionDate`: Index for date-based queries
- `status`: Index for filtering by transaction status
- `relatedEntityType, relatedEntityId`: Compound index for entity-related transactions

## Data Relationships

![Database Relationships](./assets/images/database-relationships.png)

## Data Encryption

Sensitive data is encrypted using the following approach:

1. **Social Media Tokens**: Encrypted using AES-256 with keys stored in AWS KMS
2. **Follower Backup Data**: Encrypted using AES-GCM with unique keys per backup
3. **Payment Information**: Handled via Stripe, never stored directly in our database

## Sharding Strategy

For horizontal scaling, collections are sharded based on:

- **Users & SocialAccounts**: Sharded by userId
- **Content**: Sharded by userId
- **Analytics**: Sharded by userId and time-based chunks
- **FollowerBackups**: Sharded by socialAccountId

## Data Lifecycle Management

- **FollowerBackups**: Retained for 90 days by default, configurable by account tier
- **Analytics**: Raw data compressed after 30 days, aggregated after 90 days
- **Content**: Draft content older than 90 days marked for archival

---

© 2025 SocialGuardian. All rights reserved.
