import React from 'react';

import { Typography } from '@mui/material';

import AuthLayout, { AuthLayoutProps } from '@layouts/AuthLayout';

export default {
  component: AuthLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null
    }
  }
};

export const Default: React.FC<AuthLayoutProps> = (args) => (
  <AuthLayout {...args}>
    <>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
        corporis quam recusandae repellendus voluptates. Aut consectetur dolore
        doloribus ducimus ea enim et eum exercitationem explicabo facere iusto
        minus nesciunt non nostrum, numquam, officia pariatur perspiciatis,
        possimus quis quisquam sed similique totam ut? dolore doloremque ex
        laudantium nesciunt nihil vitae voluptas voluptatibus. In laborum
        necessitatibus nihil?
      </Typography>
      <br />
      <Typography>
        Amet cum enim error ex nihil quibusdam rem voluptatum. Architecto aut,
        cumque excepturi mollitia nam nostrum obcaecati perferendis quasi rem,
        unde vel voluptas voluptates. Aspernatur, dolore dolorum est fugit
        libero nemo porro quam ullam. Adipisci facere illo, iure iusto
        perferendis praesentium quo suscipit tenetur! At cupiditate debitis
        delectus excepturi fugit, ipsum iusto nobis, odio provident quae,
        ratione voluptates! Hic, id, reprehenderit? Fuga officia perspiciatis
        repellat. Ab asperiores, at delectus earum et ex, exercitationem
        incidunt, inventore natus odio quisquam ratione rem?
      </Typography>
      <br />
      <Typography>
        A at illo odio possimus rem. Amet animi exercitationem harum ipsum
        libero qui voluptas voluptatem voluptates! A, ad amet animi aspernatur
        assumenda consectetur consequuntur eius, enim esse explicabo facere illo
        impedit iusto minima molestias mollitia officia possimus quae quidem
        ratione repellat sint unde. Ad aut autem cupiditate debitis deserunt
        distinctio ea est eum, excepturi fuga fugiat, fugit ipsam magni modi
        mollitia natus nulla pariatur perspiciatis quia reiciendis soluta ullam
        velit veritatis vitae voluptatibus.
      </Typography>
      <br />
      <Typography>
        Consequatur, doloremque eum explicabo fugit hic iusto labore, maiores
        mollitia necessitatibus nobis nulla numquam officia quas quidem ratione
        repudiandae, soluta voluptatem? Ad alias aliquam aspernatur assumenda
        consectetur cumque dolorem enim eveniet exercitationem facilis illum
        iure maxime, minima nobis obcaecati officiis qui quisquam reiciendis,
        rem voluptatem! Aperiam assumenda consectetur consequuntur distinctio et
        illum minus molestias quam quas sit! Accusamus enim odit provident
        vitae. Asperiores aspernatur eum labore magnam minima non odio tempore
        tenetur, ut veniam. Ab adipisci architecto assumenda atque aut
        cupiditate eligendi error eveniet facere impedit iste magni nihil quae,
        voluptas.
      </Typography>
    </>
  </AuthLayout>
);
