const express = require('express');
const router = express.Router();

// Mock subscription data (replace with real database)
let subscriptions = [];

// Subscription plans
const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    features: [
      'Basic market data',
      'Limited news access',
      'Basic charts'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 29.99,
    features: [
      'Full market data',
      'Premium analytics',
      'Advanced charts',
      'Portfolio analysis',
      'Real-time alerts',
      'Priority support'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99.99,
    features: [
      'All Premium features',
      'API access',
      'Custom reports',
      'Dedicated support',
      'White-label options'
    ]
  }
];

// Get available plans
router.get('/plans', (req, res) => {
  try {
    res.json({
      success: true,
      data: plans,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Plans error:', error);
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
});

// Create subscription checkout session
router.post('/checkout', (req, res) => {
  try {
    const { planId, userId } = req.body;
    
    const plan = plans.find(p => p.id === planId);
    if (!plan) {
      return res.status(400).json({ error: 'Invalid plan' });
    }
    
    // TODO: Integrate with Stripe/Paystack
    // For now, create a mock checkout session
    const checkoutSession = {
      id: `cs_${Date.now()}`,
      planId,
      userId,
      amount: plan.price * 100, // Convert to cents
      currency: 'USD',
      status: 'pending',
      checkoutUrl: `https://checkout.example.com/session/${Date.now()}`,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
    };
    
    res.json({
      success: true,
      data: checkoutSession,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Handle payment webhook
router.post('/webhook', (req, res) => {
  try {
    const { event, data } = req.body;
    
    // TODO: Verify webhook signature
    
    switch (event) {
      case 'payment.succeeded':
        // Handle successful payment
        const subscription = {
          id: `sub_${Date.now()}`,
          userId: data.userId,
          planId: data.planId,
          status: 'active',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
          paymentId: data.paymentId
        };
        
        subscriptions.push(subscription);
        console.log('Subscription created:', subscription);
        break;
        
      case 'payment.failed':
        console.log('Payment failed:', data);
        break;
        
      default:
        console.log('Unhandled webhook event:', event);
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Get user subscription
router.get('/user/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    const subscription = subscriptions.find(sub => 
      sub.userId === userId && sub.status === 'active'
    );
    
    if (!subscription) {
      return res.json({
        success: true,
        data: {
          hasSubscription: false,
          plan: plans[0] // Basic plan
        }
      });
    }
    
    const plan = plans.find(p => p.id === subscription.planId);
    
    res.json({
      success: true,
      data: {
        hasSubscription: true,
        subscription,
        plan
      }
    });
  } catch (error) {
    console.error('User subscription error:', error);
    res.status(500).json({ error: 'Failed to fetch user subscription' });
  }
});

// Cancel subscription
router.post('/cancel/:subscriptionId', (req, res) => {
  try {
    const { subscriptionId } = req.params;
    
    const subscription = subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    
    subscription.status = 'cancelled';
    subscription.cancelledAt = new Date().toISOString();
    
    // TODO: Cancel with payment provider
    
    res.json({
      success: true,
      message: 'Subscription cancelled successfully',
      data: subscription
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

// Get subscription usage
router.get('/usage/:subscriptionId', (req, res) => {
  try {
    const { subscriptionId } = req.params;
    
    const subscription = subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    
    // Mock usage data
    const usage = {
      apiCalls: 1250,
      dataDownloads: 45,
      reportsGenerated: 12,
      alertsSent: 8,
      limits: {
        apiCalls: 10000,
        dataDownloads: 100,
        reportsGenerated: 50,
        alertsSent: 100
      }
    };
    
    res.json({
      success: true,
      data: usage
    });
  } catch (error) {
    console.error('Usage error:', error);
    res.status(500).json({ error: 'Failed to fetch usage data' });
  }
});

module.exports = router; 