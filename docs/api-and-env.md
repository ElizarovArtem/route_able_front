# API And Environment

This document describes frontend integration points for backend HTTP, realtime connections, uploaded media, video lessons, and AI workout dependencies.

## Environment Variables

### `VITE_API_URL`

Backend base URL used by:

- Axios client in `src/f.shared/api/client.ts`
- Socket.IO chat namespace in `src/f.shared/api/socket.ts`
- uploaded media URLs, for example avatar/image paths

Example local value:

```bash
VITE_API_URL=http://localhost:3005
```

### `VITE_NODE_ENV`

Used by `src/a.app/routes/__root.tsx` to switch production rendering behavior.

## Config Access

Add environment values to `src/f.shared/config/env.ts` and consume them through the exported `config` object. Avoid direct `import.meta.env.*` reads outside app setup or config code unless there is a narrow reason.

When adding a new `VITE_*` variable:

1. Add it to `src/f.shared/config/env.ts`.
2. Document it in `README.md`.
3. Provide a local example in this document if setup is not obvious.
4. Keep the app usable in development without secrets whenever possible.

## HTTP Client

Use `api` from `src/f.shared/api/client.ts` for backend HTTP calls.

The shared Axios client:

- uses `config.API_URL` as `baseURL`
- sends credentials with requests
- sets JSON content type by default
- applies auth refresh handling through `access-token.interceptor.ts`
- applies centralized error handling through `error-handler.interceptor.ts`

Request functions should live under the owning slice:

```text
src/e.entities/<segment>/api/requests
src/d.features/<segment>/api/requests
```

React Query hooks should live beside them under `api/queries`.

## Request Ownership

Use entity requests for reading or describing domain data, such as fetching users, lessons, subscriptions, meals, or AI workout sessions.

Use feature requests for user commands and business actions, such as booking a lesson, updating a user, creating a payment, sending feedback, adding a planned meal, or completing a workout set.

## Realtime Chat

Socket.IO setup lives in `src/f.shared/api/socket.ts`.

The current socket connection uses:

```ts
io(`${config.API_URL}/chats`, {
  transports: ['websocket'],
  withCredentials: true,
});
```

Use `connectSocket`, `getSocket`, and `disconnectSocket` from the shared socket module instead of creating socket clients inside UI components.

Chat-specific helpers currently live under `src/e.entities/user/api/websocket` and `src/e.entities/user/model/heplers`. Keep event names and acknowledgement payload handling close to those modules unless the chat domain is split into its own entity later.

## Uploaded Media

Uploaded media paths are built from `config.API_URL`, for example:

```text
${VITE_API_URL}/uploads/<file>
```

Keep this construction centralized in shared/entity UI helpers where possible. Avoid duplicating backend URL rules in unrelated components.

## LiveKit Video Lessons

LiveKit dependencies are used by video lesson and AI assistant widgets. The current UI uses:

- `@livekit/components-react`
- `@livekit/components-styles`
- `livekit-client`

Keep LiveKit room rendering inside widget-level UI or a dedicated video entity/feature if it becomes reused more broadly. Token creation and lesson/session commands should remain in the relevant feature/entity API layer.

## TensorFlow And Pose Detection

AI workout pose detection uses:

- `@tensorflow-models/pose-detection`
- `@tensorflow/tfjs-core`
- `@tensorflow/tfjs-backend-webgl`

The pose detection hook currently lives in `src/e.entities/aiAssistant/model/aiAssistant.usePoseDetection.ts`. The default MoveNet model path is:

```text
/models/movenet/singlepose/lightning/model.json
```

When changing model paths or adding model assets, verify that the files are available from the built app's public asset path.

## Local Mock Server

`npm run server` is configured to run:

```bash
json-server db.json -p 3005
```

If a local `db.json` is added or restored, keep mock data non-sensitive and aligned with the API shapes expected by request functions.

## Verification Checklist

For API/config changes, run:

```bash
npm run type-check
npm run test
```

Run `npm run build` when changing app setup, routing, environment config, or production rendering behavior.
