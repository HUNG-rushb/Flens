import React from "react";
import { Suspense } from "react";
import Page from "../components/utils/Page";

const Explore = () => {
  return (
    <Page title="Flens-Explore">
      <Suspense fallback={null}>
        <div>Explore</div>
      </Suspense>
    </Page>
  )
}

export default Explore;