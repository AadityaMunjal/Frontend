import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { REDIRECT } from "../../constants";
import { history } from "../../helpers";
import { useAuthStore } from "../../stores/useAuthStore";
import Loading from "../../components/Loading/Loading.component";
import { useURLQuery } from "../../hooks/useURLQuery";

const DiscordCallbackPage = (): JSX.Element => {
  const query = useURLQuery();
  const setToken = useAuthStore((s) => s.setToken);

  useQuery<{ token: string }>(
    "login callback",
    async () => {
      return await axios
        .post<{ token: string }>(
          "/auth/discord/callback",
          {
            callback: REDIRECT,
            code: query.get("code"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.data);
    },
    {
      onSuccess: ({ token }) => {
        setToken(token);
        history.replace("/");
      },
    }
  );

  return <Loading />;
};

export default DiscordCallbackPage;
