import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";

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

  return (
    <div className="p-4">
      <p className="p-4 text-3xl font-bold">{message}</p>
      <Button>Click Me</Button>
    </div>
  );
};

export default App;
