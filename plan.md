## Plan: NativeTrade MVP for B2B Multilingual Commerce

Build a hackathon-ready full-stack MVP in Next.js + TypeScript + Drizzle + Supabase Postgres with Better Auth, where one business owner registers the company and can invite many team members (each with their own login and role), and teams can discover other businesses/products, request quotes (RFQ), place orders, and chat in-app with automatic translation via lingo.dev plus AI writing assistance via Vercel AI SDK using OpenRouter keys. Prioritize shipping core flows end-to-end in 3-7 days, then improve reliability and UX.

**Steps**
1. Phase 1 - Foundation and Architecture Lock (Day 1)
2. Confirm environment and secrets contract in a central env module: Supabase Postgres URL, Better Auth secret/base URL, lingo.dev key, OpenRouter key, model defaults, and Pusher/WebSocket credentials. Define fail-fast validation for missing keys in non-local environments.
3. Define module boundaries so integration can evolve without rewrites: auth module, marketplace module, chat module, translation provider adapter, AI assistant adapter, and shared typed DTO schemas. This allows provider swapping later while keeping APIs stable.
4. Correct existing auth-page behavior and establish protected-route policy for app sections requiring login (dashboard, businesses, orders, chat). Keep public access only for landing and auth screens. This step blocks all downstream feature work. 
5. Phase 2 - Data Model and Migrations (Day 1-2, depends on Phase 1)
6. Extend Drizzle schema with business marketplace entities for owner-plus-team membership: business, business_profile fields, business_member, business_invitation, member_role permissions, product, product_category (optional simplified enum), rfq, rfq_item, order, order_item, and order_status history. Include indexes for list/search paths and strict foreign keys.
7. Add chat entities: conversation, conversation_participant, message, message_translation, message_ai_variant (tone/grammar rewrite outputs), message_summary, and optional read_receipt. Persist both source and translated text metadata.
8. Add shared audit fields (createdAt, updatedAt) and soft-delete policy where useful (products/messages optional for MVP). Generate and apply Drizzle migrations against Supabase Postgres.
9. Create seeded sample data for hackathon demos: 6-10 businesses across regions/languages, sample product catalogs, 2-3 RFQ/order records, and seed chat threads with mixed languages.
10. Phase 3 - Auth, Session, and Access Control (Day 2, depends on Phase 2)
11. Implement server-side session helpers and route guards in app layout/page boundaries; ensure all protected pages resolve current user and user business quickly.
12. Enforce owner-plus-team constraints in onboarding and backend APIs: owner creates business, invites members, and members join with explicit role assignment. If a signed-in user has no business membership, redirect to business setup/invite acceptance flow.
13. Add authorization checks for all business-scoped resources with role-based access (owner/admin/sales/member). Owners/admins manage business settings, catalog, and member invites; sales/member roles get restricted operational actions. Cross-business access is limited to marketplace list, RFQ, order, and chat permissions.
14. Phase 4 - Marketplace and RFQ/Order APIs (Day 2-3, depends on Phase 3)
15. Create typed route handlers under app/api for:
16. Business discovery: list/filter/search businesses by category, country, language, tags.
17. Product catalog: CRUD for owner business products and public read for other businesses.
18. RFQ workflow: create RFQ against supplier business, supplier response state transitions (pending/responded/closed).
19. Order workflow: create order from accepted RFQ or direct catalog checkout, update statuses (placed/confirmed/shipped/delivered/cancelled).
20. Add business member management APIs: invite member, resend/revoke invite, accept invite, list members, and update member role with owner/admin restrictions.
21. Build shared API client layer in app/api-client with typed fetch wrappers, error normalization, and auth-aware requests for React pages.
22. Phase 5 - Marketplace UI Screens (Day 3-4, depends on Phase 4)
22. Implement Businesses page with searchable cards/table, business profile snippet, and CTA actions: view catalog, send RFQ, start chat.
23. Implement Orders page with status tabs, timeline badges, and action buttons constrained by role/state.
24. Implement Dashboard page with KPI blocks (open RFQs, active orders, unread chats, catalog views) from lightweight aggregation endpoints.
25. Add business onboarding/setup UI if missing (name, country, primary language, categories, logo optional), plus member invitation and role-management screens for the business team.
26. Phase 6 - Real-Time Chat + Translation + AI Assist (Day 4-5, depends on Phases 3 and 4, partially parallel with Phase 5)
27. Introduce real-time transport (Pusher/WebSocket per your preference) for new messages, typing indicators, and read updates.
28. Implement chat APIs: create conversation, list conversations, fetch paginated messages, send/edit message.
29. Integrate lingo.dev translation pipeline:
30. On send, store original message and detect source language.
31. Translate to recipient business preferred language and cache in message_translation.
32. On view, serve translated variant when available; fallback to source text with async translation trigger.
33. Integrate AI assistant through Vercel AI SDK + OpenRouter:
34. Compose endpoint for rewrite actions (formal/friendly/professional), grammar cleanup, and thread/message summarization.
35. Save generated variants in message_ai_variant or return ephemeral output depending on UX mode.
36. Add per-message UI actions in Chat page: Translate toggle, Rewrite tone menu, Fix grammar, Summarize.
37. Phase 7 - Reliability, Security, and Demo Readiness (Day 5-6, depends on all previous)
38. Add request validation and type-safe input schemas for all APIs; reject cross-business access and malformed payloads.
39. Add rate limiting and abuse controls on chat send, translation calls, and AI rewrite endpoints to protect API budgets.
40. Add optimistic UI and retry strategies for chat/order updates; expose user-friendly error states.
41. Add observability basics: structured logging around translation/AI latency and failure rates, plus fallback behavior.
42. Phase 8 - Testing and Launch Checklist (Day 6-7, depends on all previous)
43. Validate end-to-end user journeys:
44. User signs up/signs in.
45. Creates business profile and invites at least one sales-team member.
46. Discovers another business and products.
47. Sends RFQ and converts to order.
48. Starts chat and exchanges multilingual messages.
49. Uses AI rewrite/grammar/summarize tools.
50. Add integration tests for key APIs (auth guards, RFQ/order transitions, chat send/translate, AI rewrite endpoint).
51. Run migration smoke test on clean database and perform rollback rehearsal.
52. Prepare demo script and seeded accounts for two regions (for example, Germany and USA) to showcase translation and tone adaptation clearly.

**Relevant files**
- c:/Users/Thunder Flash/Desktop/Projects/Lingo Hackathon/lib/auth/auth.ts - Better Auth server config to extend with hooks/session helpers.
- c:/Users/Thunder Flash/Desktop/Projects/Lingo Hackathon/lib/auth/auth.client.ts - client auth integration for UI flows.
- c:/Users/Thunder Flash/Desktop/Projects/Lingo Hackathon/app/api/auth/[...all]/route.ts - auth route already wired; keep as auth gateway.
- c:/Users/Thunder Flash/Desktop/Projects/Lingo Hackathon/drizzle/db.connect.ts - DB connection and drizzle instance.
- c:/Users/Thunder Flash/Desktop/Projects/Lingo Hackathon/drizzle/db/index.schema.ts - schema export hub for new marketplace/chat tables.
- c:/Users/Thunder Flash/Desktop/Projects/Lingo Hackathon/drizzle/db/user/user.schema.ts - existing user table references for foreign keys.
- c:/Users/Thunder Flash/Desktop/Projects/Lingo Hackathon/app/businesses/page.tsx - businesses discovery and catalog entry UI.
- c:/Users/Thunder Flash/Desktop/Projects/Lingo Hackathon/app/orders/page.tsx - RFQ/order management UI.
- c:/Users/Thunder Flash/Desktop/Projects/Lingo Hackathon/app/chat/page.tsx - multilingual chat UI and AI tools.
- c:/Users/Thunder Flash/Desktop/Projects/Lingo Hackathon/app/dashboard/page.tsx - operational KPI and activity overview.
- c:/Users/Thunder Flash/Desktop/Projects/Lingo Hackathon/app/layout.tsx - app-level protected layout/session integration.
- c:/Users/Thunder Flash/Desktop/Projects/Lingo Hackathon/components/global/Sidebar.tsx - navigation and section linking.
- c:/Users/Thunder Flash/Desktop/Projects/Lingo Hackathon/app/api-client - typed client layer to build from empty baseline.

**Verification**
1. Run local checks: lint/build/type checks and migration generation/apply against Supabase dev DB.
2. Execute API-level test matrix for auth-protected marketplace and chat endpoints.
3. Run manual multilingual chat scenario: Business A sends German, Business B reads English translation and replies; verify reverse translation.
4. Run AI assistant scenario: rewrite same message in three tones, grammar fix, summarize long thread; confirm outputs render and can be sent.
5. Validate authorization boundaries by attempting cross-business edits and ensuring rejection.
6. Perform load sanity for chat message bursts and translation queues in hackathon-expected concurrency.

**Decisions**
- Timeline: Hackathon MVP (3-7 days).
- Tenancy model: one business owner account plus multiple invited member accounts (sales team) with role-based permissions in v1.
- Commerce model: both catalog and RFQ supported in MVP.
- Translation provider: lingo.dev.
- AI integration: Vercel AI SDK with OpenRouter keys for model flexibility.
- Real-time chat: WebSocket/Pusher class solution prioritized for UX.

**Further Considerations**
1. Real-time choice recommendation: if time is tight, use managed Pusher channels to avoid operating your own socket infra in hackathon week.
2. Translation cost-control recommendation: translate on-demand plus cache by messageId+targetLanguage, instead of pretranslating to all languages.
3. AI safety recommendation: add basic moderation/length limits before rewrite endpoints to reduce abuse and token burn.
