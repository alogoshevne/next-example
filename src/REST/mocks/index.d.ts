declare module './db.json' {
  import { IProfile } from '@bus/profile/typedefs';
  const db: {
    profile: IProfile;
  };
  export default db;
}
