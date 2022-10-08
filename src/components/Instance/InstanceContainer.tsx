import React, { useEffect, useState } from "react";
import Instance, { InstanceProps } from "./Instance";
import { listen } from "@tauri-apps/api/event";
import { gameLaunched, gameClosed } from "messages/events";

function InstanceContainer(props: Omit<InstanceProps, "isLaunched">) {
  const { instance } = props;
  const [isLaunched, setIsLaunched] = useState(false);
  useEffect(() => {
    const unlisten = listen<string>(gameLaunched, (event) => {
      const instanceName = event.payload;

      if (instanceName === instance.name) setIsLaunched(true);
    });

    return () => {
      unlisten.then((f) => {
        f();
      });
    };
  }, []);

  useEffect(() => {
    const unlisten = listen<string>(gameClosed, (event) => {
      const instanceName = event.payload;

      if (instanceName === instance.name) setIsLaunched(false);
    });

    return () => {
      unlisten.then((f) => {
        f();
      });
    };
  }, []);

  return <Instance {...props} isLaunched={isLaunched} />;
}

export default InstanceContainer;
