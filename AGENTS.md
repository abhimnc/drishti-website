<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep mentorship programme prices and inclusions in the shared site data and render them through the shared plan component so all pages stay consistent.
- Pre-optimize shared Button dependencies with React in Vite so late dependency discovery does not mix React generations in an already-open preview.
- Keep supplementary offerings and contact destinations in shared site data and render offerings through StudyProducts so prices and enquiry links stay consistent across pages.
- StudyBackground owns the homepage slideshow and honors reduced-motion preferences so changing imagery stays accessible and separate from page content.
- Public publications use loader-fed query options and anonymous RLS-scoped reads; the studio writes through the browser client with database-enforced publisher roles so drafts and editing remain private.
- Store article, carousel and video entries in one posts table, validate through the shared publishing schema, and render with PostReader so formats stay consistent.
- Publication images use private storage with published-post read policies and expiring signed URLs because this workspace blocks public buckets.
- Assign publisher roles only from the verified auth email through the database lifecycle trigger; never infer editing rights from browser state or editable metadata.
- Keep FAQs and illustrative timetables in shared study-guidance data; derive fee answers from site data so confirmed prices cannot drift.
- Use MotionPage for progressive scroll reveals and StudyEmblem for illustrated navigation symbols; reduced-motion mode must keep all content visible and still.
- PageHero provides shared photographic subpage presentation; ExamIdentity uses original pathway badges rather than claiming official institutional endorsement, and generated product imagery must be labeled illustrative until actual product photos are supplied.
- Credential scans are published only with roll/reference/enrolment numbers, QR codes, barcodes and family names blurred; regenerate redacted copies rather than adding original documents.
