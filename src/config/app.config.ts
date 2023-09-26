interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Travel Agent'],
  customerRoles: ['Customer'],
  tenantRoles: ['Team Member', 'Travel Agent'],
  tenantName: 'Provider',
  applicationName: 'Tickets Booking Application',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['Read user information', 'Book tickets', 'Read ticket information', 'Read booking information'],
  ownerAbilities: [
    'Manage user information',
    'Manage ticket information',
    'Manage booking information',
    'Manage travel agent information',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/a2c0524a-5954-47b2-93ad-bbff659fdfbb',
};
