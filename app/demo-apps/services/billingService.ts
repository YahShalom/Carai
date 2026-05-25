export type BillingStatus = {
  subscription: 'free' | 'trial' | 'active' | 'past_due' | 'cancelled';
  plan: string;
  renewalDate?: string;
};

export async function getBillingStatus(userId: string): Promise<BillingStatus> {
  console.debug('[BillingService] getBillingStatus', userId);
  return {
    subscription: 'free',
    plan: 'starter',
  };
}

export async function createCheckoutSession(productId: string, userId: string): Promise<{ sessionId: string }> {
  console.debug('[BillingService] createCheckoutSession', { productId, userId });
  return {
    sessionId: 'stripe_placeholder_session',
  };
}

export async function validateSubscription(userId: string): Promise<boolean> {
  console.debug('[BillingService] validateSubscription', userId);
  return true;
}
