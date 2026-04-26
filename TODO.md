# Tab Context Implementation Plan

## Steps:
1. [x] Update `app/types/type.ts` — add `TabData` interface and context types
2. [x] Create `app/context/tab-context.tsx` — React Context with TabProvider
3. [x] Update `app/services/provides.tsx` — consume TabContext, remove local tab state
4. [x] Update `app/components/UI/tab-screen.tsx` — consume TabContext for active tab data
5. [x] Update `app/page.tsx` — wrap with TabProvider
6. [x] Test the implementation — build passed successfully


