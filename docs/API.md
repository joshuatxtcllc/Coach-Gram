# SocialGuardian API Documentation

## Overview

The SocialGuardian API provides programmatic access to the platform's core functionality, allowing developers to integrate social media management, analysis, and protection features into their applications.

Base URL: `https://api.socialguardian.com/v1`

## Authentication

All API requests require authentication using a Bearer token.

```
Authorization: Bearer YOUR_API_TOKEN
```

To obtain an API token:
1. Log in to your SocialGuardian account
2. Navigate to Settings > Developer
3. Create a new API key

API keys are tied to your subscription level and have corresponding rate limits.

## Rate Limits

| Plan | Requests/Minute | Requests/Day |
|------|----------------|--------------|
| Free | 10 | 100 |
| Pro | 60 | 5,000 |
| VIP | 120 | 15,000 |
| Elite | 300 | 50,000 |

Rate limit headers are included in all API responses:
- `X-RateLimit-Limit`: Request limit for the current time window
- `X-RateLimit-Remaining`: Remaining requests in the current window
- `X-RateLimit-Reset`: Time when the rate limit resets (Unix timestamp)

## Common HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid or missing authentication |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

## Endpoints

### Authentication

#### POST /auth/token

Generates an API token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

#### POST /auth/refresh

Refreshes an expired access token.

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

### Social Accounts

#### GET /accounts

Retrieves all connected social media accounts.

**Response:**
```json
{
  "accounts": [
    {
      "id": "5f8a3b2c1d0e9f8a7b6c5d4e",
      "platform": "instagram",
      "handle": "yourbrand",
      "displayName": "Your Brand",
      "profileUrl": "https://instagram.com/yourbrand",
      "profileImageUrl": "https://cdn.socialguardian.com/profiles/yourbrand.jpg",
      "followerCount": 12450,
      "followingCount": 1025,
      "postCount": 342,
      "isBusinessAccount": true,
      "categoryName": "Apparel & Clothing",
      "isVerified": false,
      "connectionStatus": "active",
      "lastSyncAt": "2025-02-15T14:23:10Z",
      "hasBackup": true
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}
```

#### POST /accounts/connect

Connects a new social media account.

**Request:**
```json
{
  "platform": "instagram",
  "access_token": "IGQVJYeXAmpLEt0ken...",
  "refresh_token": "IGQVJYeXAmpLEr3fresh..."
}
```

**Response:**
```json
{
  "id": "5f8a3b2c1d0e9f8a7b6c5d4e",
  "platform": "instagram",
  "handle": "yourbrand",
  "connectionStatus": "active",
  "message": "Account successfully connected"
}
```

#### DELETE /accounts/{account_id}

Disconnects a social media account.

**Response:**
```json
{
  "message": "Account successfully disconnected",
  "id": "5f8a3b2c1d0e9f8a7b6c5d4e"
}
```

### Content Management

#### GET /content

Retrieves content items (posts, stories, etc.).

**Query Parameters:**
- `account_id` (optional): Filter by social account
- `status` (optional): Filter by status (draft, scheduled, published)
- `type` (optional): Filter by content type (post, story, reel, carousel)
- `from_date` (optional): Start date for filtering
- `to_date` (optional): End date for filtering
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "content": [
    {
      "id": "6a1b2c3d4e5f6a7b8c9d0e1f",
      "socialAccountId": "5f8a3b2c1d0e9f8a7b6c5d4e",
      "contentType": "post",
      "status": "published",
      "mediaUrls": ["https://cdn.socialguardian.com/content/image1.jpg"],
      "caption": "Check out our new summer collection! #fashion #summer",
      "hashtags": ["fashion", "summer"],
      "mentions": ["@influencer1"],
      "publishedAt": "2025-03-10T12:30:00Z",
      "postUrl": "https://instagram.com/p/AbCdEfGhIjK",
      "performance": {
        "likes": 342,
        "comments": 28,
        "shares": 15,
        "engagementRate": 3.1
      }
    }
  ],
  "total": 87,
  "page": 1,
  "limit": 20
}
```

#### POST /content

Creates a new content item.

**Request:**
```json
{
  "socialAccountId": "5f8a3b2c1d0e9f8a7b6c5d4e",
  "contentType": "post",
  "mediaUrls": ["https://example.com/image.jpg"],
  "caption": "Our new product launch! #exciting",
  "hashtags": ["exciting", "newproduct", "launch"],
  "scheduledFor": "2025-03-20T15:00:00Z"
}
```

**Response:**
```json
{
  "id": "6a1b2c3d4e5f6a7b8c9d0e1f",
  "status": "scheduled",
  "message": "Content scheduled successfully"
}
```

#### GET /content/{content_id}

Retrieves a specific content item.

**Response:**
```json
{
  "id": "6a1b2c3d4e5f6a7b8c9d0e1f",
  "socialAccountId": "5f8a3b2c1d0e9f8a7b6c5d4e",
  "contentType": "post",
  "status": "scheduled",
  "mediaUrls": ["https://cdn.socialguardian.com/content/image1.jpg"],
  "caption": "Check out our new summer collection! #fashion #summer",
  "hashtags": ["fashion", "summer"],
  "mentions": ["@influencer1"],
  "scheduledFor": "2025-03-20T15:00:00Z"
}
```

#### PUT /content/{content_id}

Updates an existing content item.

**Request:**
```json
{
  "caption": "Updated caption for our new launch! #exciting #innovation",
  "hashtags": ["exciting", "innovation", "newproduct"],
  "scheduledFor": "2025-03-21T16:00:00Z"
}
```

**Response:**
```json
{
  "id": "6a1b2c3d4e5f6a7b8c9d0e1f",
  "message": "Content updated successfully"
}
```

#### DELETE /content/{content_id}

Deletes a content item.

**Response:**
```json
{
  "message": "Content deleted successfully",
  "id": "6a1b2c3d4e5f6a7b8c9d0e1f"
}
```

### AI Content Generation

#### POST /ai/generate/caption

Generates caption options based on provided parameters.

**Request:**
```json
{
  "socialAccountId": "5f8a3b2c1d0e9f8a7b6c5d4e",
  "topic": "Summer product launch",
  "tone": "exciting",
  "contentType": "post",
  "includeHashtags": true,
  "count": 3
}
```

**Response:**
```json
{
  "captions": [
    {
      "text": "Summer just got better! Introducing our latest collection designed for those perfect sunny days. Tap the link in bio to be the first to shop! ☀️",
      "hashtags": ["summerlaunch", "newcollection", "summerstyle", "fashioninspo", "summerfashion"]
    },
    {
      "text": "The wait is over! Our summer collection drops TODAY and it's everything you've been dreaming of. Limited quantities available!",
      "hashtags": ["summerdrop", "limitededition", "newrelease", "summervibes", "shopnow"]
    },
    {
      "text": "Bright days call for brighter styles! Swipe to see our top picks from the new summer collection – now available online and in stores.",
      "hashtags": ["summercollection", "newarrivals", "seasonalstyle", "fashionfinds", "shopthislook"]
    }
  ]
}
```

### Analytics

#### GET /analytics/overview

Retrieves analytics overview for connected accounts.

**Query Parameters:**
- `account_id` (optional): Filter by social account
- `period` (required): Time period (daily, weekly, monthly)
- `start_date` (required): Start date
- `end_date` (required): End date

**Response:**
```json
{
  "period": "monthly",
  "startDate": "2025-02-01T00:00:00Z",
  "endDate": "2025-02-28T23:59:59Z",
  "accounts": [
    {
      "id": "5f8a3b2c1d0e9f8a7b6c5d4e",
      "platform": "instagram",
      "handle": "yourbrand",
      "metrics": {
        "followerGrowth": {
          "start": 12105,
          "end": 12450,
          "change": 345,
          "percentage": 2.85
        },
        "engagement": {
          "total": 24680,
          "avgPerPost": 1234,
          "rate": 3.2
        },
        "contentPerformance": {
          "totalPosts": 20,
          "topPerformingPostId": "6a1b2c3d4e5f6a7b8c9d0e1f",
          "topPerformingMetrics": {
            "likes": 2345,
            "comments": 128,
            "engagementRate": 5.8
          }
        }
      }
    }
  ]
}
```

### Account Protection

#### POST /protection/backup

Creates a backup of followers for an account.

**Request:**
```json
{
  "socialAccountId": "5f8a3b2c1d0e9f8a7b6c5d4e"
}
```

**Response:**
```json
{
  "id": "7a1b2c3d4e5f6a7b8c9d0e1f",
  "socialAccountId": "5f8a3b2c1d0e9f8a7b6c5d4e",
  "status": "in_progress",
  "message": "Backup initiated, you will be notified when complete",
  "estimatedTimeMinutes": 5
}
```

#### GET /protection/backups

Retrieves backup history for an account.

**Query Parameters:**
- `account_id` (required): Social account ID
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "backups": [
    {
      "id": "7a1b2c3d4e5f6a7b8c9d0e1f",
      "socialAccountId": "5f8a3b2c1d0e9f8a7b6c5d4e",
      "backupDate": "2025-03-15T08:30:00Z",
      "followerCount": 12450,
      "status": "complete",
      "expiryDate": "2025-06-15T08:30:00Z"
    },
    {
      "id": "7a1b2c3d4e5f6a7b8c9d0e2f",
      "socialAccountId": "5f8a3b2c1d0e9f8a7b6c5d4e",
      "backupDate": "2025-02-15T10:15:00Z",
      "followerCount": 12105,
      "status": "complete",
      "expiryDate": "2025-05-15T10:15:00Z"
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 20
}
```

#### POST /protection/recovery/message

Generates recovery messages for follower re-engagement.

**Request:**
```json
{
  "socialAccountId": "5f8a3b2c1d0e9f8a7b6c5d4e",
  "backupId": "7a1b2c3d4e5f6a7b8c9d0e1f",
  "newAccountHandle": "yourbrand_new",
  "reason": "account_hacked"
}
```

**Response:**
```json
{
  "messages": {
    "directMessage": "🚨 Our account was compromised. Please follow our new official account @yourbrand_new for continued updates.",
    "post": "IMPORTANT: Our original account was hacked. This is our new official account. Please follow us here for all future updates and content. Thanks for your support during this transition.",
    "story": "Our account was compromised. This is our new official account. Please follow us here and spread the word!",
    "email": "Dear follower, our Instagram account was recently compromised. We've created a new official account @yourbrand_new. Please follow us there for continued updates and content. Thank you for your support."
  }
}
```

### Campaigns

#### GET /campaigns

Retrieves all campaigns.

**Query Parameters:**
- `status` (optional): Filter by status (planning, active, completed, paused)
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "campaigns": [
    {
      "id": "8a1b2c3d4e5f6a7b8c9d0e1f",
      "name": "Summer Collection Launch",
      "description": "Launch campaign for our new summer collection",
      "status": "active",
      "startDate": "2025-03-01T00:00:00Z",
      "endDate": "2025-04-15T23:59:59Z",
      "platforms": ["instagram", "facebook"],
      "contentCount": 24,
      "performance": {
        "impressions": 156000,
        "engagementRate": 4.2,
        "conversions": 782
      }
    }
  ],
  "total": 8,
  "page": 1,
  "limit": 20
}
```

### Influencer Marketplace

#### GET /influencers

Searches for influencers based on criteria.

**Query Parameters:**
- `category` (optional): Filter by category
- `minFollowers` (optional): Minimum follower count
- `maxFollowers` (optional): Maximum follower count
- `platforms` (optional): Comma-separated list of platforms
- `locations` (optional): Comma-separated list of locations
- `minEngagement` (optional): Minimum engagement rate
- `availability` (optional): Filter by availability status
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "influencers": [
    {
      "id": "9a1b2c3d4e5f6a7b8c9d0e1f",
      "displayName": "Fashion Forward",
      "handleByPlatform": {
        "instagram": "fashionforward",
        "tiktok": "fashion.forward"
      },
      "category": ["fashion", "lifestyle"],
      "audience": {
        "size": 85000,
        "demographics": {
          "ageGroups": {
            "18-24": 35,
            "25-34": 42,
            "35-44": 18,
            "45+": 5
          },
          "genderSplit": {
            "female": 74,
            "male": 24,
            "other": 2
          }
        },
        "topLocations": [
          {"name": "New York", "percentage": 15},
          {"name": "Los Angeles", "percentage": 12},
          {"name": "London", "percentage": 8}
        ]
      },
      "engagementMetrics": {
        "avgEngagementRate": 3.8,
        "avgComments": 120
      },
      "contentTypes": ["photos", "reels"],
      "pricing": {
        "post": 850,
        "story": 350,
        "reel": 1200
      },
      "currency": "USD",
      "availability": "available",
      "isPlatformVerified": true,
      "rating": 4.8
    }
  ],
  "total": 45,
  "page": 1,
  "limit": 20
}
```

## Webhooks

SocialGuardian supports webhooks for real-time event notifications. Configure webhooks in the Developer section of your account settings.

### Available Events

- `account.connected`: Triggered when a new social account is connected
- `account.disconnected`: Triggered when a social account is disconnected
- `content.published`: Triggered when content is published
- `content.failed`: Triggered when content publishing fails
- `follower.milestone`: Triggered when follower count reaches a milestone
- `backup.completed`: Triggered when a follower backup is completed
- `campaign.started`: Triggered when a campaign begins
- `campaign.ended`: Triggered when a campaign ends
- `engagement.spike`: Triggered when unusual engagement activity is detected

### Webhook Payload Structure

```json
{
  "event": "content.published",
  "timestamp": "2025-03-17T14:35:12Z",
  "accountId": "5f8a3b2c1d0e9f8a7b6c5d4e",
  "data": {
    "contentId": "6a1b2c3d4e5f6a7b8c9d0e1f",
    "contentType": "post",
    "platform": "instagram",
    "postUrl": "https://instagram.com/p/AbCdEfGhIjK"
  }
}
```

## Error Responses

All error responses follow a consistent format:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid",
    "details": "The parameter 'scheduledFor' must be a date in the future"
  },
  "requestId": "req_abc123def456"
}
```

Common error codes:
- `invalid_request`: The request parameters are invalid
- `authentication_error`: Authentication failed
- `permission_denied`: Insufficient permissions for the action
- `resource_not_found`: The requested resource does not exist
- `rate_limit_exceeded`: You have exceeded your rate limit
- `service_unavailable`: The service is temporarily unavailable
- `platform_error`: Error from the social media platform

## SDKs and Libraries

Official client libraries are available for:
- JavaScript/TypeScript: `npm install socialguardian-js`
- Python: `pip install socialguardian`
- PHP: `composer require socialguardian/socialguardian-php`
- Ruby: `gem install socialguardian`

## Support

For API support, please contact:
- Email: api-support@socialguardian.com
- Documentation: https://docs.socialguardian.com
- Status page: https://status.socialguardian.com

---

© 2025 SocialGuardian. All rights reserved.
