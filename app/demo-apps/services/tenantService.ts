export type TenantContext = {
  id: string;
  name: string;
  domain: string;
  plan: string;
  locale: string;
  brandColor: string;
};

export async function getTenantContext(host?: string): Promise<TenantContext> {
  return {
    id: 'default',
    name: 'Atelier AI',
    domain: host || 'atelier-ai.example',
    plan: 'starter',
    locale: 'en-US',
    brandColor: '#7c3aed',
  };
}

export async function resolveTenant(host: string): Promise<TenantContext> {
  return getTenantContext(host);
}

export async function setTenant(tenant: TenantContext): Promise<TenantContext> {
  return tenant;
}
