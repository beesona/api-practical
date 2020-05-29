# Model

## Example

```javascript
import { ArrayMaxSize, IsBoolean, IsDate, IsInt, IsPositive, IsString, IsUUID, Length, Matches, MaxDate, MaxLength, MinDate, ValidateNested } from 'class-validator';
import { Validatable, ValidationGroup } from '../validation';
import { ZZZ } from './ZZZ';

function todayUTC() {
    const now = new Date();
    const utc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    return new Date(utc);
}

export class XXX extends Validatable {
    @IsUUID('4')
    id: string;

    @IsString({ always: true })
    @Length(1, 25, { always: true })
    name: string;

    @IsString({ always: true })
    @MaxLength(200, { always: true })
    description: string;

    @IsInt({ always: true })
    @IsPositive({ always: true })
    count: number;

    // TODO: create custom validator
    @Matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/, { message: 'YYYY-MM-DD', groups: [ValidationGroup.Post] })
    birthdate: string;

    @IsDate({ groups: [ValidationGroup.Post] })
    @MinDate(todayUTC(), { groups: [ValidationGroup.Post] })
    @MaxDate(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), { groups: [ValidationGroup.Post] })
    effectiveDate: Date;

    @IsBoolean({ groups: [ValidationGroup.Post] })
    hasStatus: boolean;

    @ArrayMaxSize(5)
    @IsString({ each: true })
    tags: string[];

    @ValidateNested({ groups: [ValidationGroup.Post] })
    zzzs: ZZZ[];

    @IsDate()
    createdDate: Date;

    @IsDate()
    updatedDate: Date;

    @IsBoolean()
    isActive: boolean;

    constructor(data: Partial<XXX | XXXPostBody> = {}) {
        super();
        this.id = 'id' in data ? data.id : undefined;
        this.name = data.name;
        this.description = data.description;
        this.count = data.count;
        this.birthdate = data.birthdate;
        this.effectiveDate = data.effectiveDate ? new Date(data.effectiveDate as any) : undefined;
        this.hasStatus = data.hasStatus || false;
        this.tags = 'tags' in data ? data.tags : [];
        this.zzzs = map(data.zzzs, ZZZ); // data.zzzs && data.zzzs.map ? data.zzzs.map(z => new ZZZ(z)) : undefined;
        this.createdDate = 'createdDate' in data ? data.createdDate : undefined;
        this.updatedDate = 'updatedDate' in data ? data.updatedDate : undefined;
        this.isActive = 'isActive' in data ? data.isActive : undefined;
    }
}

function map<T>(val: object[] | undefined, t: new(o: object) => T): T[] {
    return val && val.map ? val.map(v => new t(v)) : [];
}

export interface XXXPostBody {
    name: string;
    description: string;
    count: number;
    birthdate: string;
    effectiveDate: string;
    hasStatus?: boolean;
    zzzs: Array<{
        name: string;
        type: string;
    }>;
}

export type XXXPutBody = XXXPostBody;
export type XXXPatchBody = Partial<XXXPostBody>;
```

```javascript
import { IsIn, IsString } from 'class-validator';

export class ZZZ {
    @IsString()
    name: string;

    @IsIn(['foo', 'bar', 'baz'])
    type: string;

    constructor(data) {
        this.name = data.name;
        this.type = data.type;
    }
}
```