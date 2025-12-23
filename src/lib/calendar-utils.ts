import { createEvent, type EventAttributes, type DateArray } from "ics";

export interface EventData {
  title: string;
  description: string;
  location?: string;
  url?: string;
  startDate: Date;
  endDate?: Date;
  organizer?: {
    name: string;
    email: string;
  };
}

/**
 * Convert Date to DateArray format required by ics library
 * Format: [year, month, day, hour, minute]
 */
function dateToArray(date: Date): DateArray {
  return [
    date.getFullYear(),
    date.getMonth() + 1, // ics expects 1-12, not 0-11
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
}

/**
 * Generate .ics calendar file for an event
 * @param eventData - Event details
 * @returns Promise<Blob> - Calendar file as blob
 */
export async function generateCalendarFile(
  eventData: EventData
): Promise<Blob> {
  const startArray = dateToArray(eventData.startDate);
  const endArray = eventData.endDate
    ? dateToArray(eventData.endDate)
    : dateToArray(new Date(eventData.startDate.getTime() + 2 * 60 * 60 * 1000)); // Default 2 hours duration

  const event: EventAttributes = {
    start: startArray,
    end: endArray,
    title: eventData.title,
    description: eventData.description,
    location: eventData.location,
    url: eventData.url,
    status: "CONFIRMED",
    busyStatus: "BUSY",
    organizer: eventData.organizer
      ? {
          name: eventData.organizer.name,
          email: eventData.organizer.email,
        }
      : undefined,
  };

  return new Promise((resolve, reject) => {
    createEvent(event, (error, value) => {
      if (error) {
        reject(error);
        return;
      }

      const blob = new Blob([value], {
        type: "text/calendar;charset=utf-8",
      });
      resolve(blob);
    });
  });
}

/**
 * Download .ics file to user's device
 * @param eventData - Event details
 * @param filename - Optional filename (defaults to event slug)
 */
export async function downloadCalendarFile(
  eventData: EventData,
  filename?: string
): Promise<void> {
  const blob = await generateCalendarFile(eventData);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || `event-${eventData.title.toLowerCase().replace(/\s+/g, "-")}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate Google Calendar URL
 * @param eventData - Event details
 * @returns URL to add event to Google Calendar
 */
export function getGoogleCalendarUrl(eventData: EventData): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: eventData.title,
    details: eventData.description,
    location: eventData.location || "",
    dates: `${formatDateForGoogle(eventData.startDate)}/${formatDateForGoogle(
      eventData.endDate ||
        new Date(eventData.startDate.getTime() + 2 * 60 * 60 * 1000)
    )}`,
  });

  if (eventData.url) {
    params.append("sprop", `website:${eventData.url}`);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Format date for Google Calendar URL
 * Format: YYYYMMDDTHHmmssZ
 */
function formatDateForGoogle(date: Date): string {
  return date
    .toISOString()
    .replace(/-|:|\.\d+/g, "")
    .replace(/Z$/, "Z");
}

/**
 * Generate Outlook.com Calendar URL
 * @param eventData - Event details
 * @returns URL to add event to Outlook.com Calendar
 */
export function getOutlookCalendarUrl(eventData: EventData): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: eventData.title,
    body: eventData.description,
    location: eventData.location || "",
    startdt: eventData.startDate.toISOString(),
    enddt: (
      eventData.endDate ||
      new Date(eventData.startDate.getTime() + 2 * 60 * 60 * 1000)
    ).toISOString(),
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}
