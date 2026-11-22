CHRISTMAS NIGHT — PIXEL QUEST INVITATION
========================================

Your two-page, Minecraft-inspired Christmas invitation.

1. Open index.html in Chrome, Safari, or Firefox.
2. Click the red "RSVP" button to open rsvp.html.
3. Use arrow keys, the on-screen red buttons, or swipe across the maze to
   guide Santa to the chimney. A popup then unlocks the RSVP form.
4. Guests enter their name, choose one of two RSVP answers, and confirm.
   Click SAVE RSVP to send their name and answer to Formspree. The popup closes only after a successful submission.

EVENT DETAILS
Friday, December 18, 2026, 6:30 PM
10430 Swift Stream Place, Apt 408

PUBLISHING
Unzip the folder and drag the whole "christmas-invite" folder to:
https://app.netlify.com/drop
You'll receive a public website URL to share with guests.
Alternatively, upload the four files to a GitHub Pages repository.

FILES
index.html   — party invitation and pixel-art cottage
rsvp.html    — pixel-forest maze and RSVP popup
styles.css   — shared pixel-style visual design
script.js    — art, gameplay, music, and local RSVP confirmation

NOTES
- Uses a quiet 8-bit music-box arrangement of the traditional public-domain carol "Deck the Halls", always enabled. The site attempts
  to autoplay; some browsers block sound until the guest first taps or types.
- All links and buttons use a short click, and moving uses a walking sound.
  When online the website tries to use the same sound files as the reference
  invitation; offline or if they fail, it uses locally generated equivalents.
  The reference sounds are at:
  https://github.com/arakere-thejaswini/wedding-invite/tree/main/audio
  The source repository's README lists an MIT license. Audio attribution:
  Wedding Invitation by arakere-thejaswini (GitHub).
- Music is an original instrumental arrangement of "Deck the Halls" made in JavaScript.
- No framework, custom font, or paid hosting required. Original reference
  sound files are optional; built-in effects work without internet.
- After a choice is clicked, its funny message appears immediately. SAVE RSVP sends the required name and selected answer to Formspree at https://formspree.io/f/mppdyqag.
  Configure and verify email notifications in the Formspree dashboard. Sending requires internet access.
  A successful answer is also cached in the guest browser, but Formspree is the host-visible record.
- The location is visible to anyone who has the public site link. Share
  your link only with invited guests.
- The invitation and maze can load locally, but sending RSVPs requires internet.
