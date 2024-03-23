import styled from 'styled-components';
import Layout from './components/layout/Layout';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useLocation, useOutlet } from 'react-router-dom';
import routes from './routes';
import Provider from './providers';

interface Props extends SimpleComponent {}

function App(props: Props) {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};

  return (
    <Provider>
      <Layout>
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            {(_) => (
              <div
                ref={nodeRef as React.RefObject<HTMLDivElement>}
                className="fade"
              >
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </Layout>
    </Provider>
  );
}

export default App;
