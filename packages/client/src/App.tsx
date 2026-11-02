import { useEffect, useState } from "react";

type Props = {};

const App = (props: Props) => {
  const [message, setMessage] = useState("");

  const fetchAPI = (api: string) => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAPI("/api/hello");
  }, []);

  return <div className="p-4 text-3xl font-bold">{message}</div>;
};

export default App;
