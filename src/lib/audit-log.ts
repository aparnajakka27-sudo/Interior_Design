import { initialAuditActivity } from './mock-data';
import type { AuditActivity } from './mock-data';

export function addAuditActivity(activity: Omit<AuditActivity, 'id' | 'timestamp'>) {
  const newActivity: AuditActivity = {
    ...activity,
    id: "AUD-" + Date.now(),
    timestamp: new Date().toISOString()
  };
  
  initialAuditActivity.unshift(newActivity);
  return newActivity;
}
