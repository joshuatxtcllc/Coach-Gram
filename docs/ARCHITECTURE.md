graph TD
    User[User/Client] --> FE[Frontend Application]
    
    subgraph "Client Side"
        FE --> Dashboard[Dashboard]
        FE --> ContentStudio[Content Studio]
        FE --> Analytics[Analytics Module]
        FE --> CampaignManager[Campaign Manager]
        FE --> AccountGuardian[Account Guardian]
        FE --> InfluencerHub[Influencer Marketplace]
    end
    
    subgraph "API Layer"
        Dashboard --> API[API Gateway]
        ContentStudio --> API
        Analytics --> API
        CampaignManager --> API
        AccountGuardian --> API
        InfluencerHub --> API
        
        API --> AuthService[Auth Service]
        API --> ContentService[Content Service]
        API --> AnalyticsService[Analytics Service]
        API --> CampaignService[Campaign Service]
        API --> GuardianService[Guardian Service]
        API --> InfluencerService[Influencer Service]
    end
    
    subgraph "Core Services"
        AuthService --> UserDB[(User Database)]
        ContentService --> ContentDB[(Content Database)]
        AnalyticsService --> AnalyticsDB[(Analytics Database)]
        CampaignService --> CampaignDB[(Campaign Database)]
        GuardianService --> GuardianDB[(Guardian Database)]
        InfluencerService --> InfluencerDB[(Influencer Database)]
        
        ContentService --> AIEngine[AI Engine]
        AnalyticsService --> AIEngine
        CampaignService --> AIEngine
        GuardianService --> AIEngine
        InfluencerService --> AIEngine
    end
    
    subgraph "AI Engine"
        AIEngine --> CoachModule[Coach Module]
        AIEngine --> ContentModule[Content Generation]
        AIEngine --> AnalyticsModule[Analytics Module]
        AIEngine --> TrendModule[Trend Detection]
        
        CoachModule --> MLModels[(ML Models)]
        ContentModule --> MLModels
        AnalyticsModule --> MLModels
        TrendModule --> MLModels
    end
    
    subgraph "External Integrations"
        API --> SocialAPIs[Social Media APIs]
        API --> PaymentGateway[Payment Gateway]
        API --> EmailService[Email Service]
        API --> StorageService[Cloud Storage]
        
        SocialAPIs --> Instagram[Instagram]
        SocialAPIs --> Facebook[Facebook]
        SocialAPIs --> Twitter[Twitter]
        SocialAPIs --> TikTok[TikTok]
        SocialAPIs --> LinkedIn[LinkedIn]
    end
    
    subgraph "Monitoring & Support"
        API --> Logger[Logging Service]
        API --> Monitoring[Monitoring Service]
        API --> SupportSystem[Support System]
        
        Logger --> LogStorage[(Log Storage)]
        Monitoring --> AlertSystem[Alert System]
        SupportSystem --> TicketDB[(Ticket Database)]
    end
