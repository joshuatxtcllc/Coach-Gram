/**
 * CampaignBlueprint Model
 * Defines the schema and methods for campaign blueprints
 */

class CampaignBlueprint {
  /**
   * Constructor for creating a new campaign blueprint
   * @param {Object} data - The blueprint data
   */
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.description = data.description || '';
    this.category = data.category || 'general';
    this.objectives = data.objectives || [];
    this.duration = data.duration || 14; // Default 2 weeks
    this.contentTypes = data.contentTypes || [];
    this.postFrequency = data.postFrequency || 'daily';
    this.targetAudience = data.targetAudience || {};
    this.contentStructure = data.contentStructure || [];
    this.kpis = data.kpis || [];
    this.isTemplate = data.isTemplate || false;
    this.visualTheme = data.visualTheme || {};
    this.captionTemplates = data.captionTemplates || [];
    this.hashtagGroups = data.hashtagGroups || {};
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  /**
   * Generate content calendar from blueprint
   * @param {Date} startDate - The start date for the campaign
   * @returns {Array} - Array of content calendar items
   */
  generateCalendar(startDate = new Date()) {
    const calendar = [];
    const campaignStart = new Date(startDate);
    const postingDays = this.getPostingDays();
    
    // Calculate total campaign days
    let campaignDays;
    switch (this.duration) {
      case 7: campaignDays = 7; break;  // 1 week
      case 14: campaignDays = 14; break; // 2 weeks
      case 30: campaignDays = 30; break; // 1 month
      case 90: campaignDays = 90; break; // 3 months
      default: campaignDays = 14;
    }
    
    // Determine post frequency
    let postsPerWeek;
    switch (this.postFrequency) {
      case 'daily': postsPerWeek = 7; break;
      case 'weekdaysOnly': postsPerWeek = 5; break;
      case 'weekendsOnly': postsPerWeek = 2; break;
      case 'thriceWeekly': postsPerWeek = 3; break;
      case 'twiceWeekly': postsPerWeek = 2; break;
      case 'weekly': postsPerWeek = 1; break;
      default: postsPerWeek = 3;
    }

    // Use structure templates if defined, otherwise generate from scratch
    if (this.contentStructure && this.contentStructure.length > 0) {
      const structureLength = this.contentStructure.length;
      
      // Loop through campaign days
      for (let day = 0; day < campaignDays; day++) {
        const currentDate = new Date(campaignStart);
        currentDate.setDate(currentDate.getDate() + day);
        
        // Check if this day should have a post based on frequency
        if (this.shouldPostOnDay(currentDate, postingDays)) {
          // Determine which content template to use (rotating through templates)
          const templateIndex = day % structureLength;
          const template = this.contentStructure[templateIndex];
          
          // Create calendar entry
          calendar.push({
            date: currentDate.toISOString(),
            contentType: template.contentType || 'post',
            theme: template.theme || '',
            primaryMessage: template.primaryMessage || '',
            visualElements: template.visualElements || [],
            captionTemplate: template.captionTemplate || '',
            hashtagGroup: template.hashtagGroup || 'general',
            timeOfDay: this.getOptimalPostingTime(currentDate.getDay()),
            stage: this.getCampaignStage(day, campaignDays)
          });
        }
      }
    } else {
      // Generate default calendar if no structure defined
      // This would be more complex in a real app
      for (let day = 0; day < campaignDays; day++) {
        const currentDate = new Date(campaignStart);
        currentDate.setDate(currentDate.getDate() + day);
        
        // Check if this day should have a post based on frequency
        if (this.shouldPostOnDay(currentDate, postingDays)) {
          // Create a default calendar entry
          calendar.push({
            date: currentDate.toISOString(),
            contentType: this.getRandomContentType(),
            theme: this.name,
            primaryMessage: `${this.name} - Day ${day + 1}`,
            visualElements: [],
            captionTemplate: this.getDefaultCaptionTemplate(),
            hashtagGroup: 'general',
            timeOfDay: this.getOptimalPostingTime(currentDate.getDay()),
            stage: this.getCampaignStage(day, campaignDays)
          });
        }
      }
    }
    
    return calendar;
  }
  
  /**
   * Determine if post should be created on a specific day
   * @param {Date} date - The date to check
   * @param {Array} postingDays - Array of days for posting (0-6, where 0 is Sunday)
   * @returns {boolean} - Whether to post on this day
   */
  shouldPostOnDay(date, postingDays) {
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    return postingDays.includes(day);
  }
  
  /**
   * Get days of the week when posts should be published
   * @returns {Array} - Array of days (0-6, where 0 is Sunday)
   */
  getPostingDays() {
    switch (this.postFrequency) {
      case 'daily':
        return [0, 1, 2, 3, 4, 5, 6]; // Every day
      case 'weekdaysOnly':
        return [1, 2, 3, 4, 5]; // Monday to Friday
      case 'weekendsOnly':
        return [0, 6]; // Saturday and Sunday
      case 'thriceWeekly':
        return [1, 3, 5]; // Monday, Wednesday, Friday
      case 'twiceWeekly':
        return [1, 4]; // Monday and Thursday
      case 'weekly':
        return [1]; // Just Monday
      default:
        return [1, 3, 5]; // Default to Monday, Wednesday, Friday
    }
  }
  
  /**
   * Get optimal posting time based on day of week
   * @param {number} dayOfWeek - Day of week (0-6, where 0 is Sunday)
   * @returns {string} - Optimal posting time
   */
  getOptimalPostingTime(dayOfWeek) {
    // This would typically use audience analytics in a real app
    // Simplified version with common optimal times
    const times = {
      0: '15:00', // Sunday - 3pm
      1: '12:00', // Monday - noon
      2: '17:00', // Tuesday - 5pm
      3: '12:00', // Wednesday - noon
      4: '17:00', // Thursday - 5pm
      5: '12:00', // Friday - noon
      6: '11:00'  // Saturday - 11am
    };
    
    return times[dayOfWeek] || '12:00';
  }
  
  /**
   * Determine campaign stage based on day progress
   * @param {number} currentDay - Current day index
   * @param {number} totalDays - Total campaign days
   * @returns {string} - Campaign stage
   */
  getCampaignStage(currentDay, totalDays) {
    const progress = currentDay / totalDays;
    
    if (progress < 0.2) {
      return 'awareness';
    } else if (progress < 0.6) {
      return 'consideration';
    } else if (progress < 0.9) {
      return 'conversion';
    } else {
      return 'retention';
    }
  }
  
  /**
   * Get a random content type from available types
   * @returns {string} - Content type
   */
  getRandomContentType() {
    if (!this.contentTypes || this.contentTypes.length === 0) {
      return 'post';
    }
    
    const index = Math.floor(Math.random() * this.contentTypes.length);
    return this.contentTypes[index];
  }
  
  /**
   * Get default caption template
   * @returns {string} - Caption template
   */
  getDefaultCaptionTemplate() {
    if (this.captionTemplates && this.captionTemplates.length > 0) {
      const index = Math.floor(Math.random() * this.captionTemplates.length);
      return this.captionTemplates[index];
    }
    
    return "Check out our latest update for {campaign_name}! #brand #campaign";
  }
  
  /**
   * Get hash tags for a specific group
   * @param {string} group - Hashtag group name
   * @returns {Array} - Array of hashtags
   */
  getHashtags(group = 'general') {
    if (this.hashtagGroups && this.hashtagGroups[group]) {
      return this.hashtagGroups[group];
    }
    
    // Default hashtags if group not found
    return ['#socialmedia', '#marketing', '#brand', '#campaign'];
  }
  
  /**
   * Create a new campaign from this blueprint
   * @param {Object} campaignData - Additional campaign data
   * @returns {Object} - Campaign object
   */
  createCampaign(campaignData = {}) {
    const startDate = campaignData.startDate ? new Date(campaignData.startDate) : new Date();
    
    // Calculate end date based on duration
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + this.duration);
    
    // Generate calendar
    const contentCalendar = this.generateCalendar(startDate);
    
    // Create campaign object
    return {
      name: campaignData.name || this.name,
      description: campaignData.description || this.description,
      objectives: campaignData.objectives || this.objectives,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: 'planning',
      platforms: campaignData.platforms || ['instagram'],
      budget: campaignData.budget || 0,
      currency: campaignData.currency || 'USD',
      target: campaignData.target || this.targetAudience,
      contentCalendar,
      kpis: campaignData.kpis || this.kpis,
      themeSettings: campaignData.themeSettings || this.visualTheme,
      createdAt: new Date().toISOString(),
      blueprintId: this.id
    };
  }
  
  /**
   * Create a template blueprint with predefined structure
   * @param {string} templateType - Type of template to create
   * @returns {CampaignBlueprint} - New blueprint instance
   */
  static createTemplate(templateType) {
    switch (templateType) {
      case 'productLaunch':
        return new CampaignBlueprint({
          name: 'Product Launch Campaign',
          description: 'A comprehensive campaign structure for launching a new product',
          category: 'launch',
          objectives: ['Awareness', 'Interest', 'Conversion'],
          duration: 14,
          contentTypes: ['post', 'carousel', 'story', 'reel'],
          postFrequency: 'daily',
          isTemplate: true,
          contentStructure: [
            // Teaser phase
            {
              contentType: 'story',
              theme: 'Teaser',
              primaryMessage: 'Something exciting is coming soon...',
              visualElements: ['product_silhouette', 'countdown'],
              captionTemplate: 'Something big is coming. Stay tuned! #comingsoon',
              hashtagGroup: 'teaser',
              stage: 'awareness'
            },
            // Announcement
            {
              contentType: 'carousel',
              theme: 'Announcement',
              primaryMessage: 'Introducing our new product',
              visualElements: ['product_hero', 'key_features'],
              captionTemplate: 'Introducing {product_name}! We\'re thrilled to finally share our newest {product_type} with you. #newlaunch',
              hashtagGroup: 'launch',
              stage: 'awareness'
            },
            // Features highlight
            {
              contentType: 'post',
              theme: 'Features',
              primaryMessage: 'Key feature spotlight',
              visualElements: ['feature_closeup'],
              captionTemplate: 'Let\'s talk about what makes {product_name} special. This {feature_name} is a game-changer because {benefit}.',
              hashtagGroup: 'features',
              stage: 'consideration'
            },
            // Social proof
            {
              contentType: 'reel',
              theme: 'Testimonial',
              primaryMessage: 'See what people are saying',
              visualElements: ['customer_using_product', 'quote_overlay'],
              captionTemplate: 'Don\'t just take our word for it! Here\'s what @{customer_handle} had to say about {product_name}.',
              hashtagGroup: 'testimonials',
              stage: 'consideration'
            },
            // How-to / Tutorial
            {
              contentType: 'carousel',
              theme: 'Tutorial',
              primaryMessage: 'How to use the product',
              visualElements: ['step_by_step', 'tips'],
              captionTemplate: 'Here\'s how to get the most out of your {product_name} in {number} easy steps.',
              hashtagGroup: 'howto',
              stage: 'conversion'
            },
            // Limited time offer
            {
              contentType: 'post',
              theme: 'Promotion',
              primaryMessage: 'Special launch offer',
              visualElements: ['product_with_offer', 'countdown'],
              captionTemplate: 'Limited time offer! Get {discount} off {product_name} until {end_date}. Link in bio to shop now!',
              hashtagGroup: 'promotion',
              stage: 'conversion'
            },
            // FAQ
            {
              contentType: 'story',
              theme: 'FAQ',
              primaryMessage: 'Answering your questions',
              visualElements: ['question_graphics'],
              captionTemplate: 'You asked, we answered! Swipe through for our top FAQs about {product_name}.',
              hashtagGroup: 'general',
              stage: 'consideration'
            }
          ],
          hashtagGroups: {
            teaser: ['#comingsoon', '#sneakpeek', '#staytuned', '#newproduct'],
            launch: ['#newlaunch', '#justlaunched', '#newproduct', '#introducing', '#finally'],
            features: ['#featurefocus', '#productivity', '#innovation', '#design', '#quality'],
            testimonials: ['#customerlove', '#testimonial', '#happycustomer', '#review'],
            howto: ['#howto', '#tutorial', '#tips', '#hack', '#learnfromme'],
            promotion: ['#specialoffer', '#discount', '#limitedtime', '#deal', '#sale']
          },
          kpis: ['Reach', 'Engagement', 'Website Clicks', 'Conversions'],
          visualTheme: {
            colorPalette: ['#primary', '#secondary', '#accent'],
            fontStyle: 'modern',
            visualStyle: 'clean'
          }
        });
        
      case 'seasonalCampaign':
        return new CampaignBlueprint({
          name: 'Seasonal Campaign',
          description: 'A campaign structure for seasonal promotions and holidays',
          category: 'seasonal',
          objectives: ['Awareness', 'Engagement', 'Conversion'],
          duration: 14,
          contentTypes: ['post', 'carousel', 'story', 'reel'],
          postFrequency: 'thriceWeekly',
          isTemplate: true,
          // Additional structure would be defined here
        });
        
      case 'brandAwareness':
        return new CampaignBlueprint({
          name: 'Brand Awareness Campaign',
          description: 'A campaign to build brand recognition and identity',
          category: 'branding',
          objectives: ['Recognition', 'Reach', 'Engagement'],
          duration: 30,
          contentTypes: ['post', 'story', 'reel'],
          postFrequency: 'thriceWeekly',
          isTemplate: true,
          // Additional structure would be defined here
        });
        
      default:
        return new CampaignBlueprint({
          name: 'Custom Campaign',
          description: 'Create your own custom campaign structure',
          isTemplate: false
        });
    }
  }
}

export default CampaignBlueprint;
