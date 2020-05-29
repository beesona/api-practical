# Manager

## Example

```javascript
import { BasePostgresDataManager, DatasourceConfig } from '@nelnet/pg-helpers';
import sql, { concatSql } from '@nelnet/sql-tag';
import * as log4js from 'log4js';
import * as path from 'path';
import { Client, Pool, QueryConfig, QueryResult } from 'pg';
import { v4 as uuid } from 'uuid';
import { ApiConfig } from '../types/config';
import { InternalServerError } from '../types/error';
import { XXXCreatedEvent, XXXDeletedEvent, XXXUpdatedEvent } from '../types/event';
import { XXX } from '../types/model/XXX';
import { PagingConfig } from '../types/paging';
import { NotifyManager } from './NotifyManager';

const apiConfig: ApiConfig = require('../config/api-config');
const logger = log4js.getLogger(path.basename(__filename));

const notifyManager: NotifyManager = new NotifyManager();

types.setTypeParser(1700, 'text', parseFloat);
types.setTypeParser(1082, v => v);


class XXXDataManager extends BasePostgresDataManager<XXX> {
    readonly tableName = 'xxxs';

    constructor() {
        super(XXX);
        // logger.info('Using database connection', dataSourceConfig);
    }

     protected getDatabaseConfigurations(): DatasourceConfig[] {
         return apiConfig.dataSources;
     }

     protected getAwsConfiguration() {
         return apiConfig.credentials.aws;
     }

    async countXXXs(tenantId: string, servicerId: string): Promise<number> {
        return this.count(sql`WHERE tenant_id = ${tenantId} AND client_id = ${servicerId}`);
    }

    async testConnection() {
        const query = sql`SELECT NOW() FROM activities_history LIMIT 1`;
        const result = await this.execute(query);
        return result && result.rows ? result.rows[0].now : false;
    }

    async getXXXs(tenantId: string, servicerId: string, paging?: PagingConfig, xxxIds?: string[]): Promise<XXX[]> {
        const where = concatSql(
            sql`WHERE tenant_id = ${tenantId} AND client_id = ${servicerId}`,
            !!xxxIds && sql`AND id IN (${xxxIds.join()})`,
            'ORDER BY id',
            !!paging && sql`LIMIT ${paging.limit} OFFSET ${paging.offset}`
        );
        return this.select(where);
    }

    async getXXX(tenantId: string, servicerId: string, xxxId: string): Promise<XXX> {
        const result = await this.getXXXs(tenantId, servicerId, null, [xxxId]);
        return result.length === 1 ? result[0] : null;
    }

    async addXXX(tenantId: string, servicerId: string, xxx: XXX): Promise<XXX> {
        // TODO: figure out where id, tenantId and servicerId should be set
        const result = await this.insert(xxx);
        if (result && result.length === 1) {
            notifyManager.publish(new XXXCreatedEvent(result[0]));
            return result[0];
        }
        return null;  // TODO: what error should this be?
    }

    async updateXXX(tenantId: string, servicerId: string, xxxId: string, xxx: Partial<XXX>): Promise<XXX> {
        // TODO: figure out where things like updatedDate should be set
        const oldData = await this.getXXX(tenantId, servicerId, xxxId);
        const result = await this.update(xxx, sql`WHERE tenant_id = ${tenantId} AND client_id = ${servicerId} AND id = ${xxxId}`);
        if (result && result.length === 1) {
            notifyManager.publish(new XXXUpdatedEvent(oldData, result[0]));
            return result[0];
        }
        return null;  // TODO: what error should this be?
    }

    async deleteXXX(tenantId: string, servicerId: string, xxxId: string): Promise<XXX> {
        const result = await this.delete(sql`WHERE tenant_id = ${tenantId} AND client_id = ${servicerId} AND id = ${xxxId}`);
        if (result && result.length === 1) {
            notifyManager.publish(new XXXDeletedEvent(result[0]));
            return result[0];
        }
        return null;  // TODO: what error should this be?
    }

    async deleteAllByTenantIdServicerId(tenantId: string, servicerId: string): Promise<any> {
        const result = await this.executeForWrite(sql`DELETE from ${this.tableName} WHERE tenant_id = ${tenantId} AND servicer_id = ${servicerId}`);
        return { table: this.tableName, rows: result.rowCount };
    }


    async transactionalStatementExample() {
        const client = await this.getClient();
        const starterGuid = uuid();

        try {
            await client.query('BEGIN');
            const insert = sql`INSERT INTO starter(starter_guid, content) VALUES(${starterGuid}, ${'some content'}) RETURNING id`;
            const { rows } = await client.query(insert);

            const insertChild = sql`INSERT INTO starter(starter_guid, content) VALUES(${rows[0].id}, ${'some child content'})`;
            await client.query(insertChild);
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }
}

export default XXXDataManager;

```