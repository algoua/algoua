import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
  const { colorMode } = useColorMode();

  return (
    <Giscus    
      repo="algoua/algoua"
      repoId="MDEwOlJlcG9zaXRvcnkzMTQ4ODI1ODQ="
      category="General"
      categoryId="DIC_kwDOEsS6GM4CV7mv"
      mapping="url"
      term="Welcome to @giscus/react component!"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      theme={colorMode}
      lang="uk"
      loading="lazy"
      crossorigin="anonymous"
      async
    />
  );
}
