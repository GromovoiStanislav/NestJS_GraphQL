import {Options} from "@mikro-orm/core";
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as path from 'node:path'

const config: Options = {
    type: 'postgresql',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    dbName: 'db',
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    //autoLoadEntities: true,
    metadataProvider: TsMorphMetadataProvider,
    migrations: {
        path: path.join(__dirname,'./migrations'),
        glob: '!(*.d).{js,ts}',
    }
}


export default config