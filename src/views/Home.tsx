import { Container } from "components/shared";
import { CSSTransition } from "react-transition-group";
import { useRef, useState } from "react";

const Home = () => {
  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);
  return (
    <Container>
      <h1>Home</h1>
      <button type="button" onClick={() => setInProp(true)}>
        Click to Enter
      </button>
      <CSSTransition
        in={inProp}
        nodeRef={nodeRef}
        timeout={1000}
        classNames={{
          enterActive: "opacity-100 transition-opacity duration-1000",
          enterDone: "opacity-0",
        }}
      >
        <div
          ref={nodeRef}
          className="my-5 bg-red-500 h-[500px] rounded-lg opacity-0"
        ></div>
      </CSSTransition>
      <div className="my-5 bg-gray-500 h-[500px] rounded-lg"></div>
      <div className="my-5 bg-orange-500 h-[500px] rounded-lg"></div>
    </Container>
  );
};

export default Home;
