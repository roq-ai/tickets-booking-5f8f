const mapping: Record<string, string> = {
  bookings: 'booking',
  providers: 'provider',
  'team-members': 'team_member',
  tickets: 'ticket',
  'travel-agents': 'travel_agent',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
