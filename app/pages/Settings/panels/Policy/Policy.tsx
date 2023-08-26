import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp, landscapeVp } from 'layouts/properties';
import styled from 'styled-components';

const Policy = () => {
  return (
    <Container>
      <Category>서비스 이용약관</Category>
      <Wrapper>
        <Title>목적</Title>
        <Content>
          본 약관은 회원(본 약관에 동의한 자를 말하며 이하 "회원"이라고
          합니다)이 사진페이지(이하 "회사"라고 합니다)가 제공하는 서비스를
          이용함에 있어 회사와 회원의 권리 의무 및 책임사항을 규정함을 목적으로
          합니다.
        </Content>
        <Content>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
          exercitationem explicabo repudiandae ipsum autem at doloremque quasi,
          voluptate assumenda sed facilis ea et nisi magni iusto eaque velit ex
          rerum incidunt earum corporis voluptatibus, quisquam quam vel. Nisi
          nulla voluptates adipisci, magni dignissimos debitis sit, eos ipsum
          doloribus, necessitatibus dolorum temporibus iure pariatur dolor
          veritatis natus nemo commodi? Fugit magni non dolorem culpa corporis
          id dignissimos dolores accusantium eum quia possimus excepturi impedit
          quas iusto quisquam dicta explicabo numquam rerum labore consequatur
          commodi, mollitia officia. Illo necessitatibus obcaecati sapiente
          illum? Dicta necessitatibus aperiam natus ratione recusandae, quasi
          est consectetur neque ex. Earum aliquid ullam ab, fugit nesciunt
          inventore odio dolore rerum porro recusandae. Molestiae, minima
          tempore? Aliquam autem incidunt atque eius ex fuga, assumenda eos
          totam esse sunt inventore quaerat officia consequuntur veritatis at
          fugit, harum repellendus molestiae distinctio quidem minus quo eveniet
          impedit dignissimos. Quis amet facere ipsam aliquam voluptas impedit
          nostrum excepturi neque distinctio iste, debitis suscipit perspiciatis
          expedita ex cupiditate consequuntur est, maiores a. Velit, veniam.
          Necessitatibus, magni nobis. Illo suscipit vitae recusandae quos
          soluta libero officiis iure, animi repellat quia ab? Veritatis, velit
          incidunt et delectus sed facere perspiciatis neque consequuntur cumque
          similique corrupti mollitia ab, recusandae laborum quasi aliquam
          aperiam vero nam, eum rerum distinctio fugit ea aut eos. Iure
          laudantium voluptatibus quisquam repudiandae sit eaque asperiores quos
          cupiditate mollitia, porro minima quaerat modi eligendi. Magnam neque,
          esse saepe id consequuntur tenetur aut alias aliquid numquam
          repellendus asperiores adipisci. Quisquam labore laboriosam et non,
          rem, accusantium nemo incidunt tempore ullam, inventore adipisci odio
          illo. A officia laudantium quia esse accusamus consequuntur libero!
          Similique corporis voluptate, blanditiis, soluta harum est mollitia
          adipisci quos natus minima obcaecati excepturi ex autem commodi vel
          nam atque! Nam, molestiae? Reiciendis voluptatum vero, iste
          necessitatibus harum, ut fugiat labore magnam voluptates inventore
          perspiciatis id excepturi similique nulla molestiae recusandae nihil!
          Adipisci necessitatibus nesciunt tempora corrupti doloremque molestias
          praesentium blanditiis repudiandae consequatur porro cupiditate,
          sapiente quasi cumque perspiciatis, quos a asperiores, commodi vitae
          ut officia placeat! Doloremque in, incidunt, quo maiores deserunt
          beatae at hic vitae, molestias dolor minima. Facere deleniti officia
          nobis natus dolore eveniet, animi cumque accusamus iste possimus
          vitae. Porro sequi error dignissimos voluptates. Atque obcaecati
          dolore similique iure! Id iste illum inventore deleniti sequi
          consectetur eum earum dolore sunt quasi. Illum facilis ea ipsum eaque
          magnam explicabo impedit aliquid, molestiae, quae, similique nemo!
          Molestias possimus adipisci, illo obcaecati ipsam similique aliquid
          nobis beatae ratione placeat totam vel illum aliquam saepe modi,
          suscipit atque quia impedit quae tempora explicabo et, doloremque
          fuga? Nisi sit mollitia voluptatem veritatis quos commodi quasi
          consequatur repellat laboriosam facere tenetur omnis similique
          cupiditate odit molestiae ad dicta, necessitatibus odio provident
          doloremque minima, veniam iusto recusandae. Aperiam eligendi
          voluptatibus cumque provident, quas deserunt, rem accusantium omnis
          voluptatum facere esse totam cum eveniet minima expedita voluptate non
          laborum nesciunt velit error amet. Ex, quibusdam accusantium?
          Accusamus accusantium inventore quo voluptate iure reprehenderit
          sequi, a fuga facere deserunt possimus porro eligendi vel neque
          nesciunt nostrum illo sit!
        </Content>
      </Wrapper>
      <Category>개인정보 취급 방침</Category>
      <Wrapper>
        <Title>개인정보의 수집 및 이용 목적</Title>
        <Content>
          사진페이지(이하 "회사")는 수집한 개인정보를 서비스 제공의 목적을 위해
          활용합니다.
        </Content>
      </Wrapper>
    </Container>
  );
};

const Content = styled.div`
  font-size: 0.9rem;
  @media (${desktopVp}) {
    font-size: 1rem;
  }
  line-height: 1.7rem;
  font-weight: 400;
  word-break: keep-all;
  overflow-wrap: break-word;
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;
const Title = styled.div`
  font-size: 1.3rem;
  @media (${desktopVp}) {
    font-size: 1.5rem;
  }
  font-weight: 500;
  padding-bottom: 1.5rem;
  &:not(:first-child) {
    padding-top: 0.5rem;
  }
`;
const Wrapper = styled.div`
  // for first-child
`;
const Category = styled.div`
  font-size: 1.5rem;
  @media (${desktopVp}) {
    font-size: 2rem;
  }
  font-weight: 600;
  @media (${desktopVp}) {
    font-weight: 500; // 변환시 transition animation은 사용하지 않음
  }
  padding-bottom: 2rem;
  &:not(:first-child) {
    padding-top: 2rem;
  }
`;
const Container = styled.div`
  height: 100%;
  width: auto;
  margin-bottom: ${cssVarsPalette.nav_height};
  padding: 2rem 1rem 2rem 1rem;
  @media (${desktopVp}) {
    width: 50rem;
  }

  @media (${landscapeVp}) {
    padding-left: calc(1rem + env(safe-area-inset-left));
    padding-right: calc(1rem + env(safe-area-inset-right));
    padding-left: calc(1rem + constant(safe-area-inset-left));
    padding-right: calc(1rem + constant(safe-area-inset-right));
  }
`;

export default Policy;
