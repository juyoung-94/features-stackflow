import { Suspense } from "react";
import { Stack } from "./libs";
import StoreProvider from "./StoreProvider";

function App() {
  return (
    <StoreProvider>
      <Suspense>
        <Stack />
      </Suspense>
    </StoreProvider>
  );
}

export default App;
