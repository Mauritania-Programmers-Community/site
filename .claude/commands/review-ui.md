---
description: Review UI pages for layout, design, and accessibility issues using browser automation
---

# UI Review Command

Review the UI at the specified URL using browser automation.

## Arguments
- `$ARGUMENTS` - URL to review (e.g., http://localhost:3000/en/hero-comparison)

## Instructions

Use the `ui-reviewer` agent to perform a comprehensive UI review:

1. **Navigate** to: $ARGUMENTS (or http://localhost:3000/en if no URL provided)

2. **Review Checklist**:
   - Take accessibility snapshot
   - Take screenshot of current view
   - Check for layout issues
   - Review design consistency
   - Test interactive elements
   - Check console for errors
   - Test dark mode (click theme toggle)
   - Test RTL/Arabic (click language toggle)

3. **Provide feedback** on:
   - Layout problems
   - Design improvements
   - Accessibility issues
   - Performance concerns

4. **Output** a structured report with:
   - Screenshots captured
   - Issues found (with severity)
   - Recommended fixes
   - Overall score (1-10)

Use the Task tool with subagent_type="ui-reviewer" to perform this review.
