# MPC Platform - User Stories & Acceptance Criteria

## مجتمع مبرمجي موريتانيا - قصص المستخدمين ومعايير القبول

**Version:** 1.0  
**Date:** November 30, 2025

---

## Epic 1: Discovery & Onboarding

### US-001: Discover the Community

**As a** Mauritanian developer looking for tech community  
**I want to** find and learn about MPC through their website  
**So that** I can decide if I want to join the community

**Acceptance Criteria:**
- [ ] Landing page loads within 2 seconds
- [ ] Hero section clearly displays community name in Arabic and English
- [ ] Community statistics are visible (members, events, etc.)
- [ ] Value proposition is clearly communicated
- [ ] Mobile-responsive design works on all screen sizes

**Priority:** P0 (Must Have)  
**Story Points:** 5

---

### US-002: Join the Community

**As a** visitor interested in joining MPC  
**I want to** easily find the WhatsApp group join link  
**So that** I can become a member with minimal friction

**Acceptance Criteria:**
- [ ] "Join WhatsApp" button visible in hero section
- [ ] "Join" CTA visible in navigation on desktop
- [ ] "Join" CTA visible in footer
- [ ] Button opens WhatsApp link in new tab
- [ ] Button works on mobile (opens WhatsApp app)

**Priority:** P0 (Must Have)  
**Story Points:** 2

---

### US-003: Read in Preferred Language

**As an** Arabic-speaking developer  
**I want to** switch the website to Arabic  
**So that** I can read content in my native language

**Acceptance Criteria:**
- [ ] Language toggle visible in navigation
- [ ] Clicking toggle switches all UI text to Arabic
- [ ] Layout switches to RTL (right-to-left)
- [ ] Arabic font (Cairo) is used for Arabic text
- [ ] Language preference persists across page navigation
- [ ] URL updates to include locale (e.g., /ar/events)

**Priority:** P0 (Must Have)  
**Story Points:** 8

---

### US-004: Navigate the Website

**As a** visitor  
**I want to** easily navigate between different sections  
**So that** I can find the information I'm looking for

**Acceptance Criteria:**
- [ ] Navigation bar is fixed/sticky on scroll
- [ ] Navigation includes: Home, Events, Blog, Team
- [ ] Current page is highlighted in navigation
- [ ] Mobile hamburger menu works correctly
- [ ] Smooth page transitions between routes

**Priority:** P0 (Must Have)  
**Story Points:** 5

---

## Epic 2: Events

### US-005: View Upcoming Events

**As a** community member  
**I want to** see a list of upcoming events  
**So that** I can plan to attend

**Acceptance Criteria:**
- [ ] Events page shows all events
- [ ] "Upcoming" filter shows only future events
- [ ] Events sorted by date (nearest first for upcoming)
- [ ] Each event card shows: title, date, speaker, status
- [ ] Event cards link to detail page

**Priority:** P0 (Must Have)  
**Story Points:** 5

---

### US-006: View Event Details

**As a** community member interested in an event  
**I want to** see full details about an event  
**So that** I can learn more and decide to attend

**Acceptance Criteria:**
- [ ] Event page displays cover image
- [ ] Title and description are visible
- [ ] Date and time clearly shown
- [ ] Speaker information displayed with photo
- [ ] Platform (Google Meet, etc.) indicated
- [ ] For upcoming: Join link displayed prominently
- [ ] For completed: Recording link/embed shown

**Priority:** P0 (Must Have)  
**Story Points:** 5

---

### US-007: Watch Event Recording

**As a** member who missed an event  
**I want to** watch the recorded session  
**So that** I can still learn from the content

**Acceptance Criteria:**
- [ ] Completed events have YouTube video embedded
- [ ] Video plays within the page (no redirect)
- [ ] Video is responsive on mobile
- [ ] "Recording Available" badge shown on event card

**Priority:** P0 (Must Have)  
**Story Points:** 3

---

### US-008: Filter Events by Type

**As a** member with specific interests  
**I want to** filter events by type (workshop, meetup, etc.)  
**So that** I can find events relevant to me

**Acceptance Criteria:**
- [ ] Filter options shown: All, Workshop, Meetup, Webinar
- [ ] Clicking filter updates displayed events
- [ ] Active filter is visually highlighted
- [ ] Filter state can be reset to "All"
- [ ] Empty state shown if no events match filter

**Priority:** P1 (Should Have)  
**Story Points:** 3

---

### US-009: View Event Photo Gallery

**As a** member viewing a past event  
**I want to** see photos from the event  
**So that** I can see what happened

**Acceptance Criteria:**
- [ ] Gallery section appears for events with photos
- [ ] Photos displayed in responsive grid
- [ ] Clicking photo opens larger view (lightbox)
- [ ] Navigation between photos in lightbox
- [ ] Close button to exit lightbox

**Priority:** P1 (Should Have)  
**Story Points:** 5

---

## Epic 3: Blog & Content

### US-010: Browse Blog Posts

**As a** visitor  
**I want to** browse blog posts and articles  
**So that** I can learn from community content

**Acceptance Criteria:**
- [ ] Blog page lists all published posts
- [ ] Posts sorted by date (newest first)
- [ ] Each post card shows: title, excerpt, date, author
- [ ] Cover images displayed on cards
- [ ] Tags visible on each post

**Priority:** P1 (Should Have)  
**Story Points:** 5

---

### US-011: Read Blog Post

**As a** visitor  
**I want to** read a full blog post  
**So that** I can learn from the content

**Acceptance Criteria:**
- [ ] Post page displays full MDX content
- [ ] Cover image shown at top
- [ ] Author and date displayed
- [ ] Reading time estimate shown
- [ ] Code blocks have syntax highlighting
- [ ] Callout components render correctly
- [ ] YouTube embeds work if included

**Priority:** P1 (Should Have)  
**Story Points:** 5

---

### US-012: Filter Blog by Tag

**As a** reader interested in specific topics  
**I want to** filter posts by tag  
**So that** I can find relevant content

**Acceptance Criteria:**
- [ ] Tags displayed on blog listing page
- [ ] Clicking tag filters to show only tagged posts
- [ ] Active tag is highlighted
- [ ] Clear filter option available

**Priority:** P2 (Nice to Have)  
**Story Points:** 3

---

## Epic 4: Team & Community

### US-013: View Team Members

**As a** visitor  
**I want to** see who runs the community  
**So that** I can learn about the team

**Acceptance Criteria:**
- [ ] Team page displays all team members
- [ ] Each member shows: photo, name, role, bio
- [ ] Social links (GitHub, LinkedIn) visible
- [ ] Skills/expertise tags displayed
- [ ] Roles differentiated (Founder, Admin, etc.)

**Priority:** P1 (Should Have)  
**Story Points:** 3

---

### US-014: Contact Team Member

**As a** visitor with questions  
**I want to** find contact information  
**So that** I can reach out to the team

**Acceptance Criteria:**
- [ ] Social media links visible in footer
- [ ] Email contact available (if applicable)
- [ ] Team member social links clickable
- [ ] Links open in new tab

**Priority:** P2 (Nice to Have)  
**Story Points:** 2

---

## Epic 5: Admin & Content Management

### US-015: Add New Event (Admin)

**As an** admin  
**I want to** add a new event by creating an MDX file  
**So that** it appears on the website

**Acceptance Criteria:**
- [ ] Creating MDX file with correct frontmatter works
- [ ] Event appears on events page after deployment
- [ ] All fields render correctly (title, date, speaker, etc.)
- [ ] Deployment completes within 2 minutes
- [ ] Validation errors shown if frontmatter incorrect

**Priority:** P0 (Must Have)  
**Story Points:** 3

---

### US-016: Update Event with Recording (Admin)

**As an** admin  
**I want to** add a recording link to a past event  
**So that** members can watch it

**Acceptance Criteria:**
- [ ] Adding `youtubeRecording` field to frontmatter works
- [ ] Video embeds correctly on event page
- [ ] Status can be changed to "completed"
- [ ] Changes deploy automatically on push

**Priority:** P0 (Must Have)  
**Story Points:** 2

---

### US-017: Add Blog Post (Admin)

**As an** admin  
**I want to** publish a blog post  
**So that** I can share content with the community

**Acceptance Criteria:**
- [ ] Creating MDX file in blog directory works
- [ ] Post appears on blog listing page
- [ ] Full MDX content renders correctly
- [ ] Images in MDX render correctly
- [ ] Custom components (Callout, YouTube) work

**Priority:** P1 (Should Have)  
**Story Points:** 3

---

### US-018: Update Team Information (Admin)

**As an** admin  
**I want to** update team member information  
**So that** the website stays current

**Acceptance Criteria:**
- [ ] Editing team.json updates team page
- [ ] Adding new team member works
- [ ] Removing team member works
- [ ] Photos update correctly
- [ ] Changes deploy on push

**Priority:** P1 (Should Have)  
**Story Points:** 2

---

## Epic 6: Performance & UX

### US-019: Fast Page Load

**As a** visitor  
**I want** pages to load quickly  
**So that** I don't leave due to slow performance

**Acceptance Criteria:**
- [ ] Lighthouse Performance score ≥ 90
- [ ] First Contentful Paint < 1.5 seconds
- [ ] Time to Interactive < 3 seconds
- [ ] No Cumulative Layout Shift issues
- [ ] Images lazy load correctly

**Priority:** P0 (Must Have)  
**Story Points:** 8

---

### US-020: Smooth Animations

**As a** visitor  
**I want** animations to be smooth and not laggy  
**So that** the experience feels premium

**Acceptance Criteria:**
- [ ] All animations run at 60fps
- [ ] No jank on page scroll
- [ ] Animations respect reduced motion preference
- [ ] 3D effects don't cause performance issues on mobile
- [ ] Heavy animations lazy loaded

**Priority:** P1 (Should Have)  
**Story Points:** 5

---

### US-021: Mobile-First Experience

**As a** mobile user  
**I want** the website to work perfectly on my phone  
**So that** I can access it anywhere

**Acceptance Criteria:**
- [ ] All pages responsive on mobile (320px - 768px)
- [ ] Touch targets minimum 44x44px
- [ ] No horizontal scroll
- [ ] Mobile navigation menu works
- [ ] Forms (if any) are mobile-friendly

**Priority:** P0 (Must Have)  
**Story Points:** 5

---

### US-022: Dark Mode Default

**As a** developer  
**I want** the website to be in dark mode by default  
**So that** it's easier on my eyes

**Acceptance Criteria:**
- [ ] Website loads in dark mode
- [ ] Theme toggle available in navigation
- [ ] Light mode option works correctly
- [ ] Theme preference persists across sessions
- [ ] No flash of light mode on load

**Priority:** P0 (Must Have)  
**Story Points:** 3

---

## Epic 7: SEO & Discoverability

### US-023: Search Engine Optimization

**As a** potential member searching online  
**I want** to find MPC through search engines  
**So that** I can discover the community

**Acceptance Criteria:**
- [ ] All pages have unique meta titles
- [ ] All pages have meta descriptions
- [ ] JSON-LD structured data for events
- [ ] Sitemap.xml generated
- [ ] robots.txt configured correctly
- [ ] OG images set for social sharing

**Priority:** P1 (Should Have)  
**Story Points:** 5

---

### US-024: Share Event on Social Media

**As a** member  
**I want** to share an event link on social media  
**So that** others can see it

**Acceptance Criteria:**
- [ ] Event pages have OG meta tags
- [ ] Sharing on Twitter shows preview card
- [ ] Sharing on Facebook shows preview
- [ ] Sharing on LinkedIn shows preview
- [ ] Preview includes event image and title

**Priority:** P1 (Should Have)  
**Story Points:** 3

---

## Summary Table

| Epic | Stories | P0 | P1 | P2 | Total Points |
|------|---------|----|----|----|----|
| Discovery & Onboarding | 4 | 4 | 0 | 0 | 20 |
| Events | 5 | 3 | 2 | 0 | 21 |
| Blog & Content | 3 | 0 | 2 | 1 | 13 |
| Team & Community | 2 | 0 | 1 | 1 | 5 |
| Admin & Content | 4 | 2 | 2 | 0 | 10 |
| Performance & UX | 4 | 3 | 1 | 0 | 21 |
| SEO & Discoverability | 2 | 0 | 2 | 0 | 8 |
| **Total** | **24** | **12** | **10** | **2** | **98** |

---

## Sprint Planning Suggestion

### Sprint 1 (Week 1-2): Foundation + Core Pages
- US-001, US-002, US-004, US-015, US-019, US-021, US-022
- **Points:** 25

### Sprint 2 (Week 3): Events System
- US-005, US-006, US-007, US-008, US-016
- **Points:** 18

### Sprint 3 (Week 4): Polish + Launch
- US-003, US-009, US-010, US-011, US-013, US-020, US-023, US-024
- **Points:** 36

---

**Document End**

*Last Updated: November 30, 2025*
