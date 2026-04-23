# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `uassiakad-connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListPengguna*](#listpengguna)
  - [*GetPengguna*](#getpengguna)
  - [*GetPenggunaByEmail*](#getpenggunabyemail)
  - [*ListGuru*](#listguru)
  - [*GetGuru*](#getguru)
  - [*GetLastNIP*](#getlastnip)
  - [*GetGuruByPengguna*](#getgurubypengguna)
  - [*ListSemuaSiswa*](#listsemuasiswa)
  - [*ListSiswaByKelas*](#listsiswabykelas)
  - [*GetSiswa*](#getsiswa)
  - [*GetLastNIS*](#getlastnis)
  - [*GetSiswaByPengguna*](#getsiswabypengguna)
  - [*ListSemuaKelas*](#listsemuakelas)
  - [*ListKelasByTingkat*](#listkelasbytingkat)
  - [*ListJurusan*](#listjurusan)
  - [*ListMataPelajaran*](#listmatapelajaran)
  - [*GetJadwalByKelas*](#getjadwalbykelas)
  - [*GetJadwalByGuru*](#getjadwalbyguru)
  - [*GetNilaiBySiswa*](#getnilaibysiswa)
  - [*GetNilaiByKelas*](#getnilaibykelas)
  - [*GetKehadiranByKelas*](#getkehadiranbykelas)
  - [*GetKehadiranBySiswa*](#getkehadiranbysiswa)
  - [*ListPengumuman*](#listpengumuman)
  - [*ListPrestasi*](#listprestasi)
  - [*ListAlumni*](#listalumni)
- [**Mutations**](#mutations)
  - [*CreatePengguna*](#createpengguna)
  - [*UpdatePengguna*](#updatepengguna)
  - [*DeletePengguna*](#deletepengguna)
  - [*CreateGuru*](#createguru)
  - [*UpdateGuru*](#updateguru)
  - [*DeleteGuru*](#deleteguru)
  - [*CreateSiswa*](#createsiswa)
  - [*UpdateSiswa*](#updatesiswa)
  - [*UpdateSiswaPeminatan*](#updatesiswapeminatan)
  - [*DeleteSiswa*](#deletesiswa)
  - [*CreateKelas*](#createkelas)
  - [*UpdateKelas*](#updatekelas)
  - [*DeleteKelas*](#deletekelas)
  - [*CreateJurusan*](#createjurusan)
  - [*UpdateJurusan*](#updatejurusan)
  - [*DeleteJurusan*](#deletejurusan)
  - [*CreateMataPelajaran*](#creatematapelajaran)
  - [*UpdateMataPelajaran*](#updatematapelajaran)
  - [*DeleteMataPelajaran*](#deletematapelajaran)
  - [*CreateJadwal*](#createjadwal)
  - [*DeleteJadwal*](#deletejadwal)
  - [*UpsertNilai*](#upsertnilai)
  - [*RecordKehadiran*](#recordkehadiran)
  - [*CreatePengumuman*](#createpengumuman)
  - [*DeletePengumuman*](#deletepengumuman)
  - [*CreatePrestasi*](#createprestasi)
  - [*DeletePrestasi*](#deleteprestasi)
  - [*CreateAlumni*](#createalumni)
  - [*UpdateAlumni*](#updatealumni)
  - [*DeleteAlumni*](#deletealumni)
  - [*ResetDatabase*](#resetdatabase)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `uassiakad-connector`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@uassiakad/connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@uassiakad/connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@uassiakad/connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `uassiakad-connector` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListPengguna
You can execute the `ListPengguna` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listPengguna(vars?: ListPenggunaVariables): QueryPromise<ListPenggunaData, ListPenggunaVariables>;

interface ListPenggunaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListPenggunaVariables): QueryRef<ListPenggunaData, ListPenggunaVariables>;
}
export const listPenggunaRef: ListPenggunaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPengguna(dc: DataConnect, vars?: ListPenggunaVariables): QueryPromise<ListPenggunaData, ListPenggunaVariables>;

interface ListPenggunaRef {
  ...
  (dc: DataConnect, vars?: ListPenggunaVariables): QueryRef<ListPenggunaData, ListPenggunaVariables>;
}
export const listPenggunaRef: ListPenggunaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPenggunaRef:
```typescript
const name = listPenggunaRef.operationName;
console.log(name);
```

### Variables
The `ListPengguna` query has an optional argument of type `ListPenggunaVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListPenggunaVariables {
  peran?: PeranPengguna | null;
}
```
### Return Type
Recall that executing the `ListPengguna` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPenggunaData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPenggunaData {
  penggunas: ({
    id: UUIDString;
    email: string;
    password?: string | null;
    nama: string;
    peran: PeranPengguna;
    telepon?: string | null;
    alamat?: string | null;
    fotoUrl?: string | null;
    dibuatPada: TimestampString;
  } & Pengguna_Key)[];
}
```
### Using `ListPengguna`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPengguna, ListPenggunaVariables } from '@uassiakad/connector';

// The `ListPengguna` query has an optional argument of type `ListPenggunaVariables`:
const listPenggunaVars: ListPenggunaVariables = {
  peran: ..., // optional
};

// Call the `listPengguna()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPengguna(listPenggunaVars);
// Variables can be defined inline as well.
const { data } = await listPengguna({ peran: ..., });
// Since all variables are optional for this query, you can omit the `ListPenggunaVariables` argument.
const { data } = await listPengguna();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPengguna(dataConnect, listPenggunaVars);

console.log(data.penggunas);

// Or, you can use the `Promise` API.
listPengguna(listPenggunaVars).then((response) => {
  const data = response.data;
  console.log(data.penggunas);
});
```

### Using `ListPengguna`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPenggunaRef, ListPenggunaVariables } from '@uassiakad/connector';

// The `ListPengguna` query has an optional argument of type `ListPenggunaVariables`:
const listPenggunaVars: ListPenggunaVariables = {
  peran: ..., // optional
};

// Call the `listPenggunaRef()` function to get a reference to the query.
const ref = listPenggunaRef(listPenggunaVars);
// Variables can be defined inline as well.
const ref = listPenggunaRef({ peran: ..., });
// Since all variables are optional for this query, you can omit the `ListPenggunaVariables` argument.
const ref = listPenggunaRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPenggunaRef(dataConnect, listPenggunaVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.penggunas);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.penggunas);
});
```

## GetPengguna
You can execute the `GetPengguna` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getPengguna(vars: GetPenggunaVariables): QueryPromise<GetPenggunaData, GetPenggunaVariables>;

interface GetPenggunaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPenggunaVariables): QueryRef<GetPenggunaData, GetPenggunaVariables>;
}
export const getPenggunaRef: GetPenggunaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPengguna(dc: DataConnect, vars: GetPenggunaVariables): QueryPromise<GetPenggunaData, GetPenggunaVariables>;

interface GetPenggunaRef {
  ...
  (dc: DataConnect, vars: GetPenggunaVariables): QueryRef<GetPenggunaData, GetPenggunaVariables>;
}
export const getPenggunaRef: GetPenggunaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPenggunaRef:
```typescript
const name = getPenggunaRef.operationName;
console.log(name);
```

### Variables
The `GetPengguna` query requires an argument of type `GetPenggunaVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPenggunaVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetPengguna` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPenggunaData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPenggunaData {
  pengguna?: {
    id: UUIDString;
    email: string;
    nama: string;
    peran: PeranPengguna;
    telepon?: string | null;
    alamat?: string | null;
    fotoUrl?: string | null;
  } & Pengguna_Key;
}
```
### Using `GetPengguna`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPengguna, GetPenggunaVariables } from '@uassiakad/connector';

// The `GetPengguna` query requires an argument of type `GetPenggunaVariables`:
const getPenggunaVars: GetPenggunaVariables = {
  id: ..., 
};

// Call the `getPengguna()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPengguna(getPenggunaVars);
// Variables can be defined inline as well.
const { data } = await getPengguna({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPengguna(dataConnect, getPenggunaVars);

console.log(data.pengguna);

// Or, you can use the `Promise` API.
getPengguna(getPenggunaVars).then((response) => {
  const data = response.data;
  console.log(data.pengguna);
});
```

### Using `GetPengguna`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPenggunaRef, GetPenggunaVariables } from '@uassiakad/connector';

// The `GetPengguna` query requires an argument of type `GetPenggunaVariables`:
const getPenggunaVars: GetPenggunaVariables = {
  id: ..., 
};

// Call the `getPenggunaRef()` function to get a reference to the query.
const ref = getPenggunaRef(getPenggunaVars);
// Variables can be defined inline as well.
const ref = getPenggunaRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPenggunaRef(dataConnect, getPenggunaVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.pengguna);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.pengguna);
});
```

## GetPenggunaByEmail
You can execute the `GetPenggunaByEmail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getPenggunaByEmail(vars: GetPenggunaByEmailVariables): QueryPromise<GetPenggunaByEmailData, GetPenggunaByEmailVariables>;

interface GetPenggunaByEmailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPenggunaByEmailVariables): QueryRef<GetPenggunaByEmailData, GetPenggunaByEmailVariables>;
}
export const getPenggunaByEmailRef: GetPenggunaByEmailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPenggunaByEmail(dc: DataConnect, vars: GetPenggunaByEmailVariables): QueryPromise<GetPenggunaByEmailData, GetPenggunaByEmailVariables>;

interface GetPenggunaByEmailRef {
  ...
  (dc: DataConnect, vars: GetPenggunaByEmailVariables): QueryRef<GetPenggunaByEmailData, GetPenggunaByEmailVariables>;
}
export const getPenggunaByEmailRef: GetPenggunaByEmailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPenggunaByEmailRef:
```typescript
const name = getPenggunaByEmailRef.operationName;
console.log(name);
```

### Variables
The `GetPenggunaByEmail` query requires an argument of type `GetPenggunaByEmailVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPenggunaByEmailVariables {
  email: string;
}
```
### Return Type
Recall that executing the `GetPenggunaByEmail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPenggunaByEmailData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPenggunaByEmailData {
  penggunas: ({
    id: UUIDString;
    email: string;
    nama: string;
    peran: PeranPengguna;
  } & Pengguna_Key)[];
}
```
### Using `GetPenggunaByEmail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPenggunaByEmail, GetPenggunaByEmailVariables } from '@uassiakad/connector';

// The `GetPenggunaByEmail` query requires an argument of type `GetPenggunaByEmailVariables`:
const getPenggunaByEmailVars: GetPenggunaByEmailVariables = {
  email: ..., 
};

// Call the `getPenggunaByEmail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPenggunaByEmail(getPenggunaByEmailVars);
// Variables can be defined inline as well.
const { data } = await getPenggunaByEmail({ email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPenggunaByEmail(dataConnect, getPenggunaByEmailVars);

console.log(data.penggunas);

// Or, you can use the `Promise` API.
getPenggunaByEmail(getPenggunaByEmailVars).then((response) => {
  const data = response.data;
  console.log(data.penggunas);
});
```

### Using `GetPenggunaByEmail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPenggunaByEmailRef, GetPenggunaByEmailVariables } from '@uassiakad/connector';

// The `GetPenggunaByEmail` query requires an argument of type `GetPenggunaByEmailVariables`:
const getPenggunaByEmailVars: GetPenggunaByEmailVariables = {
  email: ..., 
};

// Call the `getPenggunaByEmailRef()` function to get a reference to the query.
const ref = getPenggunaByEmailRef(getPenggunaByEmailVars);
// Variables can be defined inline as well.
const ref = getPenggunaByEmailRef({ email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPenggunaByEmailRef(dataConnect, getPenggunaByEmailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.penggunas);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.penggunas);
});
```

## ListGuru
You can execute the `ListGuru` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listGuru(): QueryPromise<ListGuruData, undefined>;

interface ListGuruRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGuruData, undefined>;
}
export const listGuruRef: ListGuruRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listGuru(dc: DataConnect): QueryPromise<ListGuruData, undefined>;

interface ListGuruRef {
  ...
  (dc: DataConnect): QueryRef<ListGuruData, undefined>;
}
export const listGuruRef: ListGuruRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listGuruRef:
```typescript
const name = listGuruRef.operationName;
console.log(name);
```

### Variables
The `ListGuru` query has no variables.
### Return Type
Recall that executing the `ListGuru` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListGuruData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListGuruData {
  gurus: ({
    id: UUIDString;
    nip: string;
    jenisKelamin: JenisKelamin;
    jabatan: JabatanGuru;
    spesialisasi?: string | null;
    tempatLahir?: string | null;
    tanggalLahir?: DateString | null;
    pengguna: {
      id: UUIDString;
      nama: string;
      email: string;
      password?: string | null;
      telepon?: string | null;
      alamat?: string | null;
    } & Pengguna_Key;
  } & Guru_Key)[];
}
```
### Using `ListGuru`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listGuru } from '@uassiakad/connector';


// Call the `listGuru()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listGuru();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listGuru(dataConnect);

console.log(data.gurus);

// Or, you can use the `Promise` API.
listGuru().then((response) => {
  const data = response.data;
  console.log(data.gurus);
});
```

### Using `ListGuru`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listGuruRef } from '@uassiakad/connector';


// Call the `listGuruRef()` function to get a reference to the query.
const ref = listGuruRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listGuruRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.gurus);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.gurus);
});
```

## GetGuru
You can execute the `GetGuru` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getGuru(vars: GetGuruVariables): QueryPromise<GetGuruData, GetGuruVariables>;

interface GetGuruRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGuruVariables): QueryRef<GetGuruData, GetGuruVariables>;
}
export const getGuruRef: GetGuruRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getGuru(dc: DataConnect, vars: GetGuruVariables): QueryPromise<GetGuruData, GetGuruVariables>;

interface GetGuruRef {
  ...
  (dc: DataConnect, vars: GetGuruVariables): QueryRef<GetGuruData, GetGuruVariables>;
}
export const getGuruRef: GetGuruRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getGuruRef:
```typescript
const name = getGuruRef.operationName;
console.log(name);
```

### Variables
The `GetGuru` query requires an argument of type `GetGuruVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetGuruVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetGuru` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetGuruData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetGuruData {
  guru?: {
    id: UUIDString;
    nip: string;
    jenisKelamin: JenisKelamin;
    jabatan: JabatanGuru;
    spesialisasi?: string | null;
    tempatLahir?: string | null;
    tanggalLahir?: DateString | null;
    pengguna: {
      id: UUIDString;
      nama: string;
      email: string;
      telepon?: string | null;
      alamat?: string | null;
      fotoUrl?: string | null;
    } & Pengguna_Key;
  } & Guru_Key;
}
```
### Using `GetGuru`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getGuru, GetGuruVariables } from '@uassiakad/connector';

// The `GetGuru` query requires an argument of type `GetGuruVariables`:
const getGuruVars: GetGuruVariables = {
  id: ..., 
};

// Call the `getGuru()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getGuru(getGuruVars);
// Variables can be defined inline as well.
const { data } = await getGuru({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getGuru(dataConnect, getGuruVars);

console.log(data.guru);

// Or, you can use the `Promise` API.
getGuru(getGuruVars).then((response) => {
  const data = response.data;
  console.log(data.guru);
});
```

### Using `GetGuru`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getGuruRef, GetGuruVariables } from '@uassiakad/connector';

// The `GetGuru` query requires an argument of type `GetGuruVariables`:
const getGuruVars: GetGuruVariables = {
  id: ..., 
};

// Call the `getGuruRef()` function to get a reference to the query.
const ref = getGuruRef(getGuruVars);
// Variables can be defined inline as well.
const ref = getGuruRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getGuruRef(dataConnect, getGuruVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.guru);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.guru);
});
```

## GetLastNIP
You can execute the `GetLastNIP` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getLastNip(): QueryPromise<GetLastNipData, undefined>;

interface GetLastNipRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLastNipData, undefined>;
}
export const getLastNipRef: GetLastNipRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLastNip(dc: DataConnect): QueryPromise<GetLastNipData, undefined>;

interface GetLastNipRef {
  ...
  (dc: DataConnect): QueryRef<GetLastNipData, undefined>;
}
export const getLastNipRef: GetLastNipRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLastNipRef:
```typescript
const name = getLastNipRef.operationName;
console.log(name);
```

### Variables
The `GetLastNIP` query has no variables.
### Return Type
Recall that executing the `GetLastNIP` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLastNipData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLastNipData {
  gurus: ({
    nip: string;
  })[];
}
```
### Using `GetLastNIP`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLastNip } from '@uassiakad/connector';


// Call the `getLastNip()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLastNip();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLastNip(dataConnect);

console.log(data.gurus);

// Or, you can use the `Promise` API.
getLastNip().then((response) => {
  const data = response.data;
  console.log(data.gurus);
});
```

### Using `GetLastNIP`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLastNipRef } from '@uassiakad/connector';


// Call the `getLastNipRef()` function to get a reference to the query.
const ref = getLastNipRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLastNipRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.gurus);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.gurus);
});
```

## GetGuruByPengguna
You can execute the `GetGuruByPengguna` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getGuruByPengguna(vars: GetGuruByPenggunaVariables): QueryPromise<GetGuruByPenggunaData, GetGuruByPenggunaVariables>;

interface GetGuruByPenggunaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGuruByPenggunaVariables): QueryRef<GetGuruByPenggunaData, GetGuruByPenggunaVariables>;
}
export const getGuruByPenggunaRef: GetGuruByPenggunaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getGuruByPengguna(dc: DataConnect, vars: GetGuruByPenggunaVariables): QueryPromise<GetGuruByPenggunaData, GetGuruByPenggunaVariables>;

interface GetGuruByPenggunaRef {
  ...
  (dc: DataConnect, vars: GetGuruByPenggunaVariables): QueryRef<GetGuruByPenggunaData, GetGuruByPenggunaVariables>;
}
export const getGuruByPenggunaRef: GetGuruByPenggunaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getGuruByPenggunaRef:
```typescript
const name = getGuruByPenggunaRef.operationName;
console.log(name);
```

### Variables
The `GetGuruByPengguna` query requires an argument of type `GetGuruByPenggunaVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetGuruByPenggunaVariables {
  penggunaId: UUIDString;
}
```
### Return Type
Recall that executing the `GetGuruByPengguna` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetGuruByPenggunaData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetGuruByPenggunaData {
  gurus: ({
    id: UUIDString;
  } & Guru_Key)[];
}
```
### Using `GetGuruByPengguna`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getGuruByPengguna, GetGuruByPenggunaVariables } from '@uassiakad/connector';

// The `GetGuruByPengguna` query requires an argument of type `GetGuruByPenggunaVariables`:
const getGuruByPenggunaVars: GetGuruByPenggunaVariables = {
  penggunaId: ..., 
};

// Call the `getGuruByPengguna()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getGuruByPengguna(getGuruByPenggunaVars);
// Variables can be defined inline as well.
const { data } = await getGuruByPengguna({ penggunaId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getGuruByPengguna(dataConnect, getGuruByPenggunaVars);

console.log(data.gurus);

// Or, you can use the `Promise` API.
getGuruByPengguna(getGuruByPenggunaVars).then((response) => {
  const data = response.data;
  console.log(data.gurus);
});
```

### Using `GetGuruByPengguna`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getGuruByPenggunaRef, GetGuruByPenggunaVariables } from '@uassiakad/connector';

// The `GetGuruByPengguna` query requires an argument of type `GetGuruByPenggunaVariables`:
const getGuruByPenggunaVars: GetGuruByPenggunaVariables = {
  penggunaId: ..., 
};

// Call the `getGuruByPenggunaRef()` function to get a reference to the query.
const ref = getGuruByPenggunaRef(getGuruByPenggunaVars);
// Variables can be defined inline as well.
const ref = getGuruByPenggunaRef({ penggunaId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getGuruByPenggunaRef(dataConnect, getGuruByPenggunaVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.gurus);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.gurus);
});
```

## ListSemuaSiswa
You can execute the `ListSemuaSiswa` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listSemuaSiswa(): QueryPromise<ListSemuaSiswaData, undefined>;

interface ListSemuaSiswaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSemuaSiswaData, undefined>;
}
export const listSemuaSiswaRef: ListSemuaSiswaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSemuaSiswa(dc: DataConnect): QueryPromise<ListSemuaSiswaData, undefined>;

interface ListSemuaSiswaRef {
  ...
  (dc: DataConnect): QueryRef<ListSemuaSiswaData, undefined>;
}
export const listSemuaSiswaRef: ListSemuaSiswaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSemuaSiswaRef:
```typescript
const name = listSemuaSiswaRef.operationName;
console.log(name);
```

### Variables
The `ListSemuaSiswa` query has no variables.
### Return Type
Recall that executing the `ListSemuaSiswa` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSemuaSiswaData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListSemuaSiswaData {
  siswas: ({
    id: UUIDString;
    nis: string;
    jenisKelamin: JenisKelamin;
    tempatLahir?: string | null;
    tanggalLahir?: DateString | null;
    alamat?: string | null;
    tahunMasuk?: number | null;
    pengguna: {
      id: UUIDString;
      nama: string;
      email: string;
      password?: string | null;
      telepon?: string | null;
      alamat?: string | null;
    } & Pengguna_Key;
      kelas?: {
        id: UUIDString;
        nama: string;
        tingkat: number;
      } & Kelas_Key;
        jurusan?: {
          id: UUIDString;
          nama: string;
        } & Jurusan_Key;
          peminatan?: {
            id: UUIDString;
            nama: string;
          } & Jurusan_Key;
  } & Siswa_Key)[];
}
```
### Using `ListSemuaSiswa`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSemuaSiswa } from '@uassiakad/connector';


// Call the `listSemuaSiswa()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSemuaSiswa();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSemuaSiswa(dataConnect);

console.log(data.siswas);

// Or, you can use the `Promise` API.
listSemuaSiswa().then((response) => {
  const data = response.data;
  console.log(data.siswas);
});
```

### Using `ListSemuaSiswa`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSemuaSiswaRef } from '@uassiakad/connector';


// Call the `listSemuaSiswaRef()` function to get a reference to the query.
const ref = listSemuaSiswaRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSemuaSiswaRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.siswas);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.siswas);
});
```

## ListSiswaByKelas
You can execute the `ListSiswaByKelas` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listSiswaByKelas(vars: ListSiswaByKelasVariables): QueryPromise<ListSiswaByKelasData, ListSiswaByKelasVariables>;

interface ListSiswaByKelasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListSiswaByKelasVariables): QueryRef<ListSiswaByKelasData, ListSiswaByKelasVariables>;
}
export const listSiswaByKelasRef: ListSiswaByKelasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSiswaByKelas(dc: DataConnect, vars: ListSiswaByKelasVariables): QueryPromise<ListSiswaByKelasData, ListSiswaByKelasVariables>;

interface ListSiswaByKelasRef {
  ...
  (dc: DataConnect, vars: ListSiswaByKelasVariables): QueryRef<ListSiswaByKelasData, ListSiswaByKelasVariables>;
}
export const listSiswaByKelasRef: ListSiswaByKelasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSiswaByKelasRef:
```typescript
const name = listSiswaByKelasRef.operationName;
console.log(name);
```

### Variables
The `ListSiswaByKelas` query requires an argument of type `ListSiswaByKelasVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListSiswaByKelasVariables {
  kelasId: UUIDString;
}
```
### Return Type
Recall that executing the `ListSiswaByKelas` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSiswaByKelasData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListSiswaByKelasData {
  siswas: ({
    id: UUIDString;
    nis: string;
    jenisKelamin: JenisKelamin;
    tempatLahir?: string | null;
    tanggalLahir?: DateString | null;
    alamat?: string | null;
    tahunMasuk?: number | null;
    pengguna: {
      id: UUIDString;
      nama: string;
      email: string;
      password?: string | null;
      telepon?: string | null;
      alamat?: string | null;
    } & Pengguna_Key;
      kelas?: {
        id: UUIDString;
        nama: string;
        tingkat: number;
      } & Kelas_Key;
        jurusan?: {
          id: UUIDString;
          nama: string;
        } & Jurusan_Key;
          peminatan?: {
            id: UUIDString;
            nama: string;
          } & Jurusan_Key;
  } & Siswa_Key)[];
}
```
### Using `ListSiswaByKelas`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSiswaByKelas, ListSiswaByKelasVariables } from '@uassiakad/connector';

// The `ListSiswaByKelas` query requires an argument of type `ListSiswaByKelasVariables`:
const listSiswaByKelasVars: ListSiswaByKelasVariables = {
  kelasId: ..., 
};

// Call the `listSiswaByKelas()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSiswaByKelas(listSiswaByKelasVars);
// Variables can be defined inline as well.
const { data } = await listSiswaByKelas({ kelasId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSiswaByKelas(dataConnect, listSiswaByKelasVars);

console.log(data.siswas);

// Or, you can use the `Promise` API.
listSiswaByKelas(listSiswaByKelasVars).then((response) => {
  const data = response.data;
  console.log(data.siswas);
});
```

### Using `ListSiswaByKelas`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSiswaByKelasRef, ListSiswaByKelasVariables } from '@uassiakad/connector';

// The `ListSiswaByKelas` query requires an argument of type `ListSiswaByKelasVariables`:
const listSiswaByKelasVars: ListSiswaByKelasVariables = {
  kelasId: ..., 
};

// Call the `listSiswaByKelasRef()` function to get a reference to the query.
const ref = listSiswaByKelasRef(listSiswaByKelasVars);
// Variables can be defined inline as well.
const ref = listSiswaByKelasRef({ kelasId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSiswaByKelasRef(dataConnect, listSiswaByKelasVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.siswas);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.siswas);
});
```

## GetSiswa
You can execute the `GetSiswa` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getSiswa(vars: GetSiswaVariables): QueryPromise<GetSiswaData, GetSiswaVariables>;

interface GetSiswaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSiswaVariables): QueryRef<GetSiswaData, GetSiswaVariables>;
}
export const getSiswaRef: GetSiswaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSiswa(dc: DataConnect, vars: GetSiswaVariables): QueryPromise<GetSiswaData, GetSiswaVariables>;

interface GetSiswaRef {
  ...
  (dc: DataConnect, vars: GetSiswaVariables): QueryRef<GetSiswaData, GetSiswaVariables>;
}
export const getSiswaRef: GetSiswaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSiswaRef:
```typescript
const name = getSiswaRef.operationName;
console.log(name);
```

### Variables
The `GetSiswa` query requires an argument of type `GetSiswaVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSiswaVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetSiswa` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSiswaData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSiswaData {
  siswa?: {
    id: UUIDString;
    nis: string;
    jenisKelamin: JenisKelamin;
    tempatLahir?: string | null;
    tanggalLahir?: DateString | null;
    alamat?: string | null;
    tahunMasuk?: number | null;
    pengguna: {
      id: UUIDString;
      nama: string;
      email: string;
      telepon?: string | null;
      alamat?: string | null;
      fotoUrl?: string | null;
    } & Pengguna_Key;
      kelas?: {
        id: UUIDString;
        nama: string;
        tingkat: number;
      } & Kelas_Key;
        jurusan?: {
          id: UUIDString;
          nama: string;
        } & Jurusan_Key;
          peminatan?: {
            id: UUIDString;
            nama: string;
          } & Jurusan_Key;
  } & Siswa_Key;
}
```
### Using `GetSiswa`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSiswa, GetSiswaVariables } from '@uassiakad/connector';

// The `GetSiswa` query requires an argument of type `GetSiswaVariables`:
const getSiswaVars: GetSiswaVariables = {
  id: ..., 
};

// Call the `getSiswa()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSiswa(getSiswaVars);
// Variables can be defined inline as well.
const { data } = await getSiswa({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSiswa(dataConnect, getSiswaVars);

console.log(data.siswa);

// Or, you can use the `Promise` API.
getSiswa(getSiswaVars).then((response) => {
  const data = response.data;
  console.log(data.siswa);
});
```

### Using `GetSiswa`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSiswaRef, GetSiswaVariables } from '@uassiakad/connector';

// The `GetSiswa` query requires an argument of type `GetSiswaVariables`:
const getSiswaVars: GetSiswaVariables = {
  id: ..., 
};

// Call the `getSiswaRef()` function to get a reference to the query.
const ref = getSiswaRef(getSiswaVars);
// Variables can be defined inline as well.
const ref = getSiswaRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSiswaRef(dataConnect, getSiswaVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.siswa);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.siswa);
});
```

## GetLastNIS
You can execute the `GetLastNIS` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getLastNis(): QueryPromise<GetLastNisData, undefined>;

interface GetLastNisRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLastNisData, undefined>;
}
export const getLastNisRef: GetLastNisRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLastNis(dc: DataConnect): QueryPromise<GetLastNisData, undefined>;

interface GetLastNisRef {
  ...
  (dc: DataConnect): QueryRef<GetLastNisData, undefined>;
}
export const getLastNisRef: GetLastNisRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLastNisRef:
```typescript
const name = getLastNisRef.operationName;
console.log(name);
```

### Variables
The `GetLastNIS` query has no variables.
### Return Type
Recall that executing the `GetLastNIS` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLastNisData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLastNisData {
  siswas: ({
    nis: string;
  })[];
}
```
### Using `GetLastNIS`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLastNis } from '@uassiakad/connector';


// Call the `getLastNis()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLastNis();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLastNis(dataConnect);

console.log(data.siswas);

// Or, you can use the `Promise` API.
getLastNis().then((response) => {
  const data = response.data;
  console.log(data.siswas);
});
```

### Using `GetLastNIS`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLastNisRef } from '@uassiakad/connector';


// Call the `getLastNisRef()` function to get a reference to the query.
const ref = getLastNisRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLastNisRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.siswas);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.siswas);
});
```

## GetSiswaByPengguna
You can execute the `GetSiswaByPengguna` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getSiswaByPengguna(vars: GetSiswaByPenggunaVariables): QueryPromise<GetSiswaByPenggunaData, GetSiswaByPenggunaVariables>;

interface GetSiswaByPenggunaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSiswaByPenggunaVariables): QueryRef<GetSiswaByPenggunaData, GetSiswaByPenggunaVariables>;
}
export const getSiswaByPenggunaRef: GetSiswaByPenggunaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSiswaByPengguna(dc: DataConnect, vars: GetSiswaByPenggunaVariables): QueryPromise<GetSiswaByPenggunaData, GetSiswaByPenggunaVariables>;

interface GetSiswaByPenggunaRef {
  ...
  (dc: DataConnect, vars: GetSiswaByPenggunaVariables): QueryRef<GetSiswaByPenggunaData, GetSiswaByPenggunaVariables>;
}
export const getSiswaByPenggunaRef: GetSiswaByPenggunaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSiswaByPenggunaRef:
```typescript
const name = getSiswaByPenggunaRef.operationName;
console.log(name);
```

### Variables
The `GetSiswaByPengguna` query requires an argument of type `GetSiswaByPenggunaVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSiswaByPenggunaVariables {
  penggunaId: UUIDString;
}
```
### Return Type
Recall that executing the `GetSiswaByPengguna` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSiswaByPenggunaData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSiswaByPenggunaData {
  siswas: ({
    id: UUIDString;
  } & Siswa_Key)[];
}
```
### Using `GetSiswaByPengguna`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSiswaByPengguna, GetSiswaByPenggunaVariables } from '@uassiakad/connector';

// The `GetSiswaByPengguna` query requires an argument of type `GetSiswaByPenggunaVariables`:
const getSiswaByPenggunaVars: GetSiswaByPenggunaVariables = {
  penggunaId: ..., 
};

// Call the `getSiswaByPengguna()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSiswaByPengguna(getSiswaByPenggunaVars);
// Variables can be defined inline as well.
const { data } = await getSiswaByPengguna({ penggunaId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSiswaByPengguna(dataConnect, getSiswaByPenggunaVars);

console.log(data.siswas);

// Or, you can use the `Promise` API.
getSiswaByPengguna(getSiswaByPenggunaVars).then((response) => {
  const data = response.data;
  console.log(data.siswas);
});
```

### Using `GetSiswaByPengguna`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSiswaByPenggunaRef, GetSiswaByPenggunaVariables } from '@uassiakad/connector';

// The `GetSiswaByPengguna` query requires an argument of type `GetSiswaByPenggunaVariables`:
const getSiswaByPenggunaVars: GetSiswaByPenggunaVariables = {
  penggunaId: ..., 
};

// Call the `getSiswaByPenggunaRef()` function to get a reference to the query.
const ref = getSiswaByPenggunaRef(getSiswaByPenggunaVars);
// Variables can be defined inline as well.
const ref = getSiswaByPenggunaRef({ penggunaId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSiswaByPenggunaRef(dataConnect, getSiswaByPenggunaVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.siswas);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.siswas);
});
```

## ListSemuaKelas
You can execute the `ListSemuaKelas` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listSemuaKelas(): QueryPromise<ListSemuaKelasData, undefined>;

interface ListSemuaKelasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSemuaKelasData, undefined>;
}
export const listSemuaKelasRef: ListSemuaKelasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSemuaKelas(dc: DataConnect): QueryPromise<ListSemuaKelasData, undefined>;

interface ListSemuaKelasRef {
  ...
  (dc: DataConnect): QueryRef<ListSemuaKelasData, undefined>;
}
export const listSemuaKelasRef: ListSemuaKelasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSemuaKelasRef:
```typescript
const name = listSemuaKelasRef.operationName;
console.log(name);
```

### Variables
The `ListSemuaKelas` query has no variables.
### Return Type
Recall that executing the `ListSemuaKelas` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSemuaKelasData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListSemuaKelasData {
  kelass: ({
    id: UUIDString;
    nama: string;
    tingkat: number;
    tahunAjaran: string;
    waliKelas?: {
      id: UUIDString;
      nip: string;
      pengguna: {
        nama: string;
      };
    } & Guru_Key;
      jurusan?: {
        id: UUIDString;
        nama: string;
      } & Jurusan_Key;
  } & Kelas_Key)[];
}
```
### Using `ListSemuaKelas`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSemuaKelas } from '@uassiakad/connector';


// Call the `listSemuaKelas()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSemuaKelas();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSemuaKelas(dataConnect);

console.log(data.kelass);

// Or, you can use the `Promise` API.
listSemuaKelas().then((response) => {
  const data = response.data;
  console.log(data.kelass);
});
```

### Using `ListSemuaKelas`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSemuaKelasRef } from '@uassiakad/connector';


// Call the `listSemuaKelasRef()` function to get a reference to the query.
const ref = listSemuaKelasRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSemuaKelasRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.kelass);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.kelass);
});
```

## ListKelasByTingkat
You can execute the `ListKelasByTingkat` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listKelasByTingkat(vars: ListKelasByTingkatVariables): QueryPromise<ListKelasByTingkatData, ListKelasByTingkatVariables>;

interface ListKelasByTingkatRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListKelasByTingkatVariables): QueryRef<ListKelasByTingkatData, ListKelasByTingkatVariables>;
}
export const listKelasByTingkatRef: ListKelasByTingkatRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listKelasByTingkat(dc: DataConnect, vars: ListKelasByTingkatVariables): QueryPromise<ListKelasByTingkatData, ListKelasByTingkatVariables>;

interface ListKelasByTingkatRef {
  ...
  (dc: DataConnect, vars: ListKelasByTingkatVariables): QueryRef<ListKelasByTingkatData, ListKelasByTingkatVariables>;
}
export const listKelasByTingkatRef: ListKelasByTingkatRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listKelasByTingkatRef:
```typescript
const name = listKelasByTingkatRef.operationName;
console.log(name);
```

### Variables
The `ListKelasByTingkat` query requires an argument of type `ListKelasByTingkatVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListKelasByTingkatVariables {
  tingkat: number;
}
```
### Return Type
Recall that executing the `ListKelasByTingkat` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListKelasByTingkatData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListKelasByTingkatData {
  kelass: ({
    id: UUIDString;
    nama: string;
    tingkat: number;
    tahunAjaran: string;
    waliKelas?: {
      id: UUIDString;
      nip: string;
      pengguna: {
        nama: string;
      };
    } & Guru_Key;
      jurusan?: {
        id: UUIDString;
        nama: string;
      } & Jurusan_Key;
  } & Kelas_Key)[];
}
```
### Using `ListKelasByTingkat`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listKelasByTingkat, ListKelasByTingkatVariables } from '@uassiakad/connector';

// The `ListKelasByTingkat` query requires an argument of type `ListKelasByTingkatVariables`:
const listKelasByTingkatVars: ListKelasByTingkatVariables = {
  tingkat: ..., 
};

// Call the `listKelasByTingkat()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listKelasByTingkat(listKelasByTingkatVars);
// Variables can be defined inline as well.
const { data } = await listKelasByTingkat({ tingkat: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listKelasByTingkat(dataConnect, listKelasByTingkatVars);

console.log(data.kelass);

// Or, you can use the `Promise` API.
listKelasByTingkat(listKelasByTingkatVars).then((response) => {
  const data = response.data;
  console.log(data.kelass);
});
```

### Using `ListKelasByTingkat`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listKelasByTingkatRef, ListKelasByTingkatVariables } from '@uassiakad/connector';

// The `ListKelasByTingkat` query requires an argument of type `ListKelasByTingkatVariables`:
const listKelasByTingkatVars: ListKelasByTingkatVariables = {
  tingkat: ..., 
};

// Call the `listKelasByTingkatRef()` function to get a reference to the query.
const ref = listKelasByTingkatRef(listKelasByTingkatVars);
// Variables can be defined inline as well.
const ref = listKelasByTingkatRef({ tingkat: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listKelasByTingkatRef(dataConnect, listKelasByTingkatVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.kelass);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.kelass);
});
```

## ListJurusan
You can execute the `ListJurusan` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listJurusan(): QueryPromise<ListJurusanData, undefined>;

interface ListJurusanRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListJurusanData, undefined>;
}
export const listJurusanRef: ListJurusanRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listJurusan(dc: DataConnect): QueryPromise<ListJurusanData, undefined>;

interface ListJurusanRef {
  ...
  (dc: DataConnect): QueryRef<ListJurusanData, undefined>;
}
export const listJurusanRef: ListJurusanRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listJurusanRef:
```typescript
const name = listJurusanRef.operationName;
console.log(name);
```

### Variables
The `ListJurusan` query has no variables.
### Return Type
Recall that executing the `ListJurusan` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListJurusanData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListJurusanData {
  jurusans: ({
    id: UUIDString;
    kode: string;
    nama: string;
  } & Jurusan_Key)[];
}
```
### Using `ListJurusan`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listJurusan } from '@uassiakad/connector';


// Call the `listJurusan()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listJurusan();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listJurusan(dataConnect);

console.log(data.jurusans);

// Or, you can use the `Promise` API.
listJurusan().then((response) => {
  const data = response.data;
  console.log(data.jurusans);
});
```

### Using `ListJurusan`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listJurusanRef } from '@uassiakad/connector';


// Call the `listJurusanRef()` function to get a reference to the query.
const ref = listJurusanRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listJurusanRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.jurusans);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.jurusans);
});
```

## ListMataPelajaran
You can execute the `ListMataPelajaran` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listMataPelajaran(): QueryPromise<ListMataPelajaranData, undefined>;

interface ListMataPelajaranRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMataPelajaranData, undefined>;
}
export const listMataPelajaranRef: ListMataPelajaranRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMataPelajaran(dc: DataConnect): QueryPromise<ListMataPelajaranData, undefined>;

interface ListMataPelajaranRef {
  ...
  (dc: DataConnect): QueryRef<ListMataPelajaranData, undefined>;
}
export const listMataPelajaranRef: ListMataPelajaranRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMataPelajaranRef:
```typescript
const name = listMataPelajaranRef.operationName;
console.log(name);
```

### Variables
The `ListMataPelajaran` query has no variables.
### Return Type
Recall that executing the `ListMataPelajaran` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMataPelajaranData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMataPelajaranData {
  mataPelajarans: ({
    id: UUIDString;
    kode: string;
    nama: string;
  } & MataPelajaran_Key)[];
}
```
### Using `ListMataPelajaran`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMataPelajaran } from '@uassiakad/connector';


// Call the `listMataPelajaran()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMataPelajaran();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMataPelajaran(dataConnect);

console.log(data.mataPelajarans);

// Or, you can use the `Promise` API.
listMataPelajaran().then((response) => {
  const data = response.data;
  console.log(data.mataPelajarans);
});
```

### Using `ListMataPelajaran`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMataPelajaranRef } from '@uassiakad/connector';


// Call the `listMataPelajaranRef()` function to get a reference to the query.
const ref = listMataPelajaranRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMataPelajaranRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.mataPelajarans);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.mataPelajarans);
});
```

## GetJadwalByKelas
You can execute the `GetJadwalByKelas` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getJadwalByKelas(vars: GetJadwalByKelasVariables): QueryPromise<GetJadwalByKelasData, GetJadwalByKelasVariables>;

interface GetJadwalByKelasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetJadwalByKelasVariables): QueryRef<GetJadwalByKelasData, GetJadwalByKelasVariables>;
}
export const getJadwalByKelasRef: GetJadwalByKelasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getJadwalByKelas(dc: DataConnect, vars: GetJadwalByKelasVariables): QueryPromise<GetJadwalByKelasData, GetJadwalByKelasVariables>;

interface GetJadwalByKelasRef {
  ...
  (dc: DataConnect, vars: GetJadwalByKelasVariables): QueryRef<GetJadwalByKelasData, GetJadwalByKelasVariables>;
}
export const getJadwalByKelasRef: GetJadwalByKelasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getJadwalByKelasRef:
```typescript
const name = getJadwalByKelasRef.operationName;
console.log(name);
```

### Variables
The `GetJadwalByKelas` query requires an argument of type `GetJadwalByKelasVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetJadwalByKelasVariables {
  kelasId: UUIDString;
  tahunAjaran?: string | null;
}
```
### Return Type
Recall that executing the `GetJadwalByKelas` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetJadwalByKelasData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetJadwalByKelasData {
  jadwals: ({
    id: UUIDString;
    jamMulai: string;
    jamSelesai: string;
    hari: string;
    ruangan?: string | null;
    semester: string;
    mataPelajaran: {
      nama: string;
    };
      guru: {
        nip: string;
        pengguna: {
          nama: string;
        };
      };
  } & Jadwal_Key)[];
}
```
### Using `GetJadwalByKelas`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getJadwalByKelas, GetJadwalByKelasVariables } from '@uassiakad/connector';

// The `GetJadwalByKelas` query requires an argument of type `GetJadwalByKelasVariables`:
const getJadwalByKelasVars: GetJadwalByKelasVariables = {
  kelasId: ..., 
  tahunAjaran: ..., // optional
};

// Call the `getJadwalByKelas()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getJadwalByKelas(getJadwalByKelasVars);
// Variables can be defined inline as well.
const { data } = await getJadwalByKelas({ kelasId: ..., tahunAjaran: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getJadwalByKelas(dataConnect, getJadwalByKelasVars);

console.log(data.jadwals);

// Or, you can use the `Promise` API.
getJadwalByKelas(getJadwalByKelasVars).then((response) => {
  const data = response.data;
  console.log(data.jadwals);
});
```

### Using `GetJadwalByKelas`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getJadwalByKelasRef, GetJadwalByKelasVariables } from '@uassiakad/connector';

// The `GetJadwalByKelas` query requires an argument of type `GetJadwalByKelasVariables`:
const getJadwalByKelasVars: GetJadwalByKelasVariables = {
  kelasId: ..., 
  tahunAjaran: ..., // optional
};

// Call the `getJadwalByKelasRef()` function to get a reference to the query.
const ref = getJadwalByKelasRef(getJadwalByKelasVars);
// Variables can be defined inline as well.
const ref = getJadwalByKelasRef({ kelasId: ..., tahunAjaran: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getJadwalByKelasRef(dataConnect, getJadwalByKelasVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.jadwals);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.jadwals);
});
```

## GetJadwalByGuru
You can execute the `GetJadwalByGuru` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getJadwalByGuru(vars: GetJadwalByGuruVariables): QueryPromise<GetJadwalByGuruData, GetJadwalByGuruVariables>;

interface GetJadwalByGuruRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetJadwalByGuruVariables): QueryRef<GetJadwalByGuruData, GetJadwalByGuruVariables>;
}
export const getJadwalByGuruRef: GetJadwalByGuruRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getJadwalByGuru(dc: DataConnect, vars: GetJadwalByGuruVariables): QueryPromise<GetJadwalByGuruData, GetJadwalByGuruVariables>;

interface GetJadwalByGuruRef {
  ...
  (dc: DataConnect, vars: GetJadwalByGuruVariables): QueryRef<GetJadwalByGuruData, GetJadwalByGuruVariables>;
}
export const getJadwalByGuruRef: GetJadwalByGuruRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getJadwalByGuruRef:
```typescript
const name = getJadwalByGuruRef.operationName;
console.log(name);
```

### Variables
The `GetJadwalByGuru` query requires an argument of type `GetJadwalByGuruVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetJadwalByGuruVariables {
  guruId: UUIDString;
  tahunAjaran?: string | null;
}
```
### Return Type
Recall that executing the `GetJadwalByGuru` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetJadwalByGuruData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetJadwalByGuruData {
  jadwals: ({
    id: UUIDString;
    jamMulai: string;
    jamSelesai: string;
    hari: string;
    ruangan?: string | null;
    semester: string;
    mataPelajaran: {
      nama: string;
    };
      kelas: {
        nama: string;
        tingkat: number;
      };
  } & Jadwal_Key)[];
}
```
### Using `GetJadwalByGuru`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getJadwalByGuru, GetJadwalByGuruVariables } from '@uassiakad/connector';

// The `GetJadwalByGuru` query requires an argument of type `GetJadwalByGuruVariables`:
const getJadwalByGuruVars: GetJadwalByGuruVariables = {
  guruId: ..., 
  tahunAjaran: ..., // optional
};

// Call the `getJadwalByGuru()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getJadwalByGuru(getJadwalByGuruVars);
// Variables can be defined inline as well.
const { data } = await getJadwalByGuru({ guruId: ..., tahunAjaran: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getJadwalByGuru(dataConnect, getJadwalByGuruVars);

console.log(data.jadwals);

// Or, you can use the `Promise` API.
getJadwalByGuru(getJadwalByGuruVars).then((response) => {
  const data = response.data;
  console.log(data.jadwals);
});
```

### Using `GetJadwalByGuru`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getJadwalByGuruRef, GetJadwalByGuruVariables } from '@uassiakad/connector';

// The `GetJadwalByGuru` query requires an argument of type `GetJadwalByGuruVariables`:
const getJadwalByGuruVars: GetJadwalByGuruVariables = {
  guruId: ..., 
  tahunAjaran: ..., // optional
};

// Call the `getJadwalByGuruRef()` function to get a reference to the query.
const ref = getJadwalByGuruRef(getJadwalByGuruVars);
// Variables can be defined inline as well.
const ref = getJadwalByGuruRef({ guruId: ..., tahunAjaran: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getJadwalByGuruRef(dataConnect, getJadwalByGuruVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.jadwals);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.jadwals);
});
```

## GetNilaiBySiswa
You can execute the `GetNilaiBySiswa` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getNilaiBySiswa(vars: GetNilaiBySiswaVariables): QueryPromise<GetNilaiBySiswaData, GetNilaiBySiswaVariables>;

interface GetNilaiBySiswaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetNilaiBySiswaVariables): QueryRef<GetNilaiBySiswaData, GetNilaiBySiswaVariables>;
}
export const getNilaiBySiswaRef: GetNilaiBySiswaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getNilaiBySiswa(dc: DataConnect, vars: GetNilaiBySiswaVariables): QueryPromise<GetNilaiBySiswaData, GetNilaiBySiswaVariables>;

interface GetNilaiBySiswaRef {
  ...
  (dc: DataConnect, vars: GetNilaiBySiswaVariables): QueryRef<GetNilaiBySiswaData, GetNilaiBySiswaVariables>;
}
export const getNilaiBySiswaRef: GetNilaiBySiswaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getNilaiBySiswaRef:
```typescript
const name = getNilaiBySiswaRef.operationName;
console.log(name);
```

### Variables
The `GetNilaiBySiswa` query requires an argument of type `GetNilaiBySiswaVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetNilaiBySiswaVariables {
  siswaId: UUIDString;
  semester?: string | null;
  tahunAjaran?: string | null;
}
```
### Return Type
Recall that executing the `GetNilaiBySiswa` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetNilaiBySiswaData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetNilaiBySiswaData {
  nilais: ({
    id: UUIDString;
    nilaiHarian?: number | null;
    nilaiUts?: number | null;
    nilaiUas?: number | null;
    semester: string;
    tahunAjaran: string;
    mataPelajaran: {
      nama: string;
      kode: string;
    };
  } & Nilai_Key)[];
}
```
### Using `GetNilaiBySiswa`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getNilaiBySiswa, GetNilaiBySiswaVariables } from '@uassiakad/connector';

// The `GetNilaiBySiswa` query requires an argument of type `GetNilaiBySiswaVariables`:
const getNilaiBySiswaVars: GetNilaiBySiswaVariables = {
  siswaId: ..., 
  semester: ..., // optional
  tahunAjaran: ..., // optional
};

// Call the `getNilaiBySiswa()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getNilaiBySiswa(getNilaiBySiswaVars);
// Variables can be defined inline as well.
const { data } = await getNilaiBySiswa({ siswaId: ..., semester: ..., tahunAjaran: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getNilaiBySiswa(dataConnect, getNilaiBySiswaVars);

console.log(data.nilais);

// Or, you can use the `Promise` API.
getNilaiBySiswa(getNilaiBySiswaVars).then((response) => {
  const data = response.data;
  console.log(data.nilais);
});
```

### Using `GetNilaiBySiswa`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getNilaiBySiswaRef, GetNilaiBySiswaVariables } from '@uassiakad/connector';

// The `GetNilaiBySiswa` query requires an argument of type `GetNilaiBySiswaVariables`:
const getNilaiBySiswaVars: GetNilaiBySiswaVariables = {
  siswaId: ..., 
  semester: ..., // optional
  tahunAjaran: ..., // optional
};

// Call the `getNilaiBySiswaRef()` function to get a reference to the query.
const ref = getNilaiBySiswaRef(getNilaiBySiswaVars);
// Variables can be defined inline as well.
const ref = getNilaiBySiswaRef({ siswaId: ..., semester: ..., tahunAjaran: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getNilaiBySiswaRef(dataConnect, getNilaiBySiswaVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.nilais);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.nilais);
});
```

## GetNilaiByKelas
You can execute the `GetNilaiByKelas` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getNilaiByKelas(vars: GetNilaiByKelasVariables): QueryPromise<GetNilaiByKelasData, GetNilaiByKelasVariables>;

interface GetNilaiByKelasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetNilaiByKelasVariables): QueryRef<GetNilaiByKelasData, GetNilaiByKelasVariables>;
}
export const getNilaiByKelasRef: GetNilaiByKelasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getNilaiByKelas(dc: DataConnect, vars: GetNilaiByKelasVariables): QueryPromise<GetNilaiByKelasData, GetNilaiByKelasVariables>;

interface GetNilaiByKelasRef {
  ...
  (dc: DataConnect, vars: GetNilaiByKelasVariables): QueryRef<GetNilaiByKelasData, GetNilaiByKelasVariables>;
}
export const getNilaiByKelasRef: GetNilaiByKelasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getNilaiByKelasRef:
```typescript
const name = getNilaiByKelasRef.operationName;
console.log(name);
```

### Variables
The `GetNilaiByKelas` query requires an argument of type `GetNilaiByKelasVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetNilaiByKelasVariables {
  kelasId: UUIDString;
  mataPelajaranId: UUIDString;
}
```
### Return Type
Recall that executing the `GetNilaiByKelas` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetNilaiByKelasData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetNilaiByKelasData {
  nilais: ({
    id: UUIDString;
    nilaiHarian?: number | null;
    nilaiUts?: number | null;
    nilaiUas?: number | null;
    siswa: {
      nis: string;
      pengguna: {
        nama: string;
      };
    };
  } & Nilai_Key)[];
}
```
### Using `GetNilaiByKelas`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getNilaiByKelas, GetNilaiByKelasVariables } from '@uassiakad/connector';

// The `GetNilaiByKelas` query requires an argument of type `GetNilaiByKelasVariables`:
const getNilaiByKelasVars: GetNilaiByKelasVariables = {
  kelasId: ..., 
  mataPelajaranId: ..., 
};

// Call the `getNilaiByKelas()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getNilaiByKelas(getNilaiByKelasVars);
// Variables can be defined inline as well.
const { data } = await getNilaiByKelas({ kelasId: ..., mataPelajaranId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getNilaiByKelas(dataConnect, getNilaiByKelasVars);

console.log(data.nilais);

// Or, you can use the `Promise` API.
getNilaiByKelas(getNilaiByKelasVars).then((response) => {
  const data = response.data;
  console.log(data.nilais);
});
```

### Using `GetNilaiByKelas`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getNilaiByKelasRef, GetNilaiByKelasVariables } from '@uassiakad/connector';

// The `GetNilaiByKelas` query requires an argument of type `GetNilaiByKelasVariables`:
const getNilaiByKelasVars: GetNilaiByKelasVariables = {
  kelasId: ..., 
  mataPelajaranId: ..., 
};

// Call the `getNilaiByKelasRef()` function to get a reference to the query.
const ref = getNilaiByKelasRef(getNilaiByKelasVars);
// Variables can be defined inline as well.
const ref = getNilaiByKelasRef({ kelasId: ..., mataPelajaranId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getNilaiByKelasRef(dataConnect, getNilaiByKelasVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.nilais);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.nilais);
});
```

## GetKehadiranByKelas
You can execute the `GetKehadiranByKelas` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getKehadiranByKelas(vars: GetKehadiranByKelasVariables): QueryPromise<GetKehadiranByKelasData, GetKehadiranByKelasVariables>;

interface GetKehadiranByKelasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetKehadiranByKelasVariables): QueryRef<GetKehadiranByKelasData, GetKehadiranByKelasVariables>;
}
export const getKehadiranByKelasRef: GetKehadiranByKelasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getKehadiranByKelas(dc: DataConnect, vars: GetKehadiranByKelasVariables): QueryPromise<GetKehadiranByKelasData, GetKehadiranByKelasVariables>;

interface GetKehadiranByKelasRef {
  ...
  (dc: DataConnect, vars: GetKehadiranByKelasVariables): QueryRef<GetKehadiranByKelasData, GetKehadiranByKelasVariables>;
}
export const getKehadiranByKelasRef: GetKehadiranByKelasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getKehadiranByKelasRef:
```typescript
const name = getKehadiranByKelasRef.operationName;
console.log(name);
```

### Variables
The `GetKehadiranByKelas` query requires an argument of type `GetKehadiranByKelasVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetKehadiranByKelasVariables {
  kelasId: UUIDString;
  tanggal: DateString;
}
```
### Return Type
Recall that executing the `GetKehadiranByKelas` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetKehadiranByKelasData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetKehadiranByKelasData {
  kehadirans: ({
    id: UUIDString;
    status: StatusKehadiran;
    catatan?: string | null;
    siswa: {
      nis: string;
      pengguna: {
        nama: string;
      };
    };
  } & Kehadiran_Key)[];
}
```
### Using `GetKehadiranByKelas`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getKehadiranByKelas, GetKehadiranByKelasVariables } from '@uassiakad/connector';

// The `GetKehadiranByKelas` query requires an argument of type `GetKehadiranByKelasVariables`:
const getKehadiranByKelasVars: GetKehadiranByKelasVariables = {
  kelasId: ..., 
  tanggal: ..., 
};

// Call the `getKehadiranByKelas()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getKehadiranByKelas(getKehadiranByKelasVars);
// Variables can be defined inline as well.
const { data } = await getKehadiranByKelas({ kelasId: ..., tanggal: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getKehadiranByKelas(dataConnect, getKehadiranByKelasVars);

console.log(data.kehadirans);

// Or, you can use the `Promise` API.
getKehadiranByKelas(getKehadiranByKelasVars).then((response) => {
  const data = response.data;
  console.log(data.kehadirans);
});
```

### Using `GetKehadiranByKelas`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getKehadiranByKelasRef, GetKehadiranByKelasVariables } from '@uassiakad/connector';

// The `GetKehadiranByKelas` query requires an argument of type `GetKehadiranByKelasVariables`:
const getKehadiranByKelasVars: GetKehadiranByKelasVariables = {
  kelasId: ..., 
  tanggal: ..., 
};

// Call the `getKehadiranByKelasRef()` function to get a reference to the query.
const ref = getKehadiranByKelasRef(getKehadiranByKelasVars);
// Variables can be defined inline as well.
const ref = getKehadiranByKelasRef({ kelasId: ..., tanggal: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getKehadiranByKelasRef(dataConnect, getKehadiranByKelasVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.kehadirans);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.kehadirans);
});
```

## GetKehadiranBySiswa
You can execute the `GetKehadiranBySiswa` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getKehadiranBySiswa(vars: GetKehadiranBySiswaVariables): QueryPromise<GetKehadiranBySiswaData, GetKehadiranBySiswaVariables>;

interface GetKehadiranBySiswaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetKehadiranBySiswaVariables): QueryRef<GetKehadiranBySiswaData, GetKehadiranBySiswaVariables>;
}
export const getKehadiranBySiswaRef: GetKehadiranBySiswaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getKehadiranBySiswa(dc: DataConnect, vars: GetKehadiranBySiswaVariables): QueryPromise<GetKehadiranBySiswaData, GetKehadiranBySiswaVariables>;

interface GetKehadiranBySiswaRef {
  ...
  (dc: DataConnect, vars: GetKehadiranBySiswaVariables): QueryRef<GetKehadiranBySiswaData, GetKehadiranBySiswaVariables>;
}
export const getKehadiranBySiswaRef: GetKehadiranBySiswaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getKehadiranBySiswaRef:
```typescript
const name = getKehadiranBySiswaRef.operationName;
console.log(name);
```

### Variables
The `GetKehadiranBySiswa` query requires an argument of type `GetKehadiranBySiswaVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetKehadiranBySiswaVariables {
  siswaId: UUIDString;
}
```
### Return Type
Recall that executing the `GetKehadiranBySiswa` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetKehadiranBySiswaData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetKehadiranBySiswaData {
  kehadirans: ({
    id: UUIDString;
    tanggal: DateString;
    status: StatusKehadiran;
    catatan?: string | null;
  } & Kehadiran_Key)[];
}
```
### Using `GetKehadiranBySiswa`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getKehadiranBySiswa, GetKehadiranBySiswaVariables } from '@uassiakad/connector';

// The `GetKehadiranBySiswa` query requires an argument of type `GetKehadiranBySiswaVariables`:
const getKehadiranBySiswaVars: GetKehadiranBySiswaVariables = {
  siswaId: ..., 
};

// Call the `getKehadiranBySiswa()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getKehadiranBySiswa(getKehadiranBySiswaVars);
// Variables can be defined inline as well.
const { data } = await getKehadiranBySiswa({ siswaId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getKehadiranBySiswa(dataConnect, getKehadiranBySiswaVars);

console.log(data.kehadirans);

// Or, you can use the `Promise` API.
getKehadiranBySiswa(getKehadiranBySiswaVars).then((response) => {
  const data = response.data;
  console.log(data.kehadirans);
});
```

### Using `GetKehadiranBySiswa`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getKehadiranBySiswaRef, GetKehadiranBySiswaVariables } from '@uassiakad/connector';

// The `GetKehadiranBySiswa` query requires an argument of type `GetKehadiranBySiswaVariables`:
const getKehadiranBySiswaVars: GetKehadiranBySiswaVariables = {
  siswaId: ..., 
};

// Call the `getKehadiranBySiswaRef()` function to get a reference to the query.
const ref = getKehadiranBySiswaRef(getKehadiranBySiswaVars);
// Variables can be defined inline as well.
const ref = getKehadiranBySiswaRef({ siswaId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getKehadiranBySiswaRef(dataConnect, getKehadiranBySiswaVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.kehadirans);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.kehadirans);
});
```

## ListPengumuman
You can execute the `ListPengumuman` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listPengumuman(): QueryPromise<ListPengumumanData, undefined>;

interface ListPengumumanRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPengumumanData, undefined>;
}
export const listPengumumanRef: ListPengumumanRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPengumuman(dc: DataConnect): QueryPromise<ListPengumumanData, undefined>;

interface ListPengumumanRef {
  ...
  (dc: DataConnect): QueryRef<ListPengumumanData, undefined>;
}
export const listPengumumanRef: ListPengumumanRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPengumumanRef:
```typescript
const name = listPengumumanRef.operationName;
console.log(name);
```

### Variables
The `ListPengumuman` query has no variables.
### Return Type
Recall that executing the `ListPengumuman` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPengumumanData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPengumumanData {
  pengumumen: ({
    id: UUIDString;
    judul: string;
    konten: string;
    isPenting: boolean;
    dibuatPada: TimestampString;
    penulis?: {
      nama: string;
    };
  } & Pengumuman_Key)[];
}
```
### Using `ListPengumuman`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPengumuman } from '@uassiakad/connector';


// Call the `listPengumuman()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPengumuman();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPengumuman(dataConnect);

console.log(data.pengumumen);

// Or, you can use the `Promise` API.
listPengumuman().then((response) => {
  const data = response.data;
  console.log(data.pengumumen);
});
```

### Using `ListPengumuman`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPengumumanRef } from '@uassiakad/connector';


// Call the `listPengumumanRef()` function to get a reference to the query.
const ref = listPengumumanRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPengumumanRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.pengumumen);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.pengumumen);
});
```

## ListPrestasi
You can execute the `ListPrestasi` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listPrestasi(vars?: ListPrestasiVariables): QueryPromise<ListPrestasiData, ListPrestasiVariables>;

interface ListPrestasiRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListPrestasiVariables): QueryRef<ListPrestasiData, ListPrestasiVariables>;
}
export const listPrestasiRef: ListPrestasiRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPrestasi(dc: DataConnect, vars?: ListPrestasiVariables): QueryPromise<ListPrestasiData, ListPrestasiVariables>;

interface ListPrestasiRef {
  ...
  (dc: DataConnect, vars?: ListPrestasiVariables): QueryRef<ListPrestasiData, ListPrestasiVariables>;
}
export const listPrestasiRef: ListPrestasiRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPrestasiRef:
```typescript
const name = listPrestasiRef.operationName;
console.log(name);
```

### Variables
The `ListPrestasi` query has an optional argument of type `ListPrestasiVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListPrestasiVariables {
  siswaId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `ListPrestasi` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPrestasiData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPrestasiData {
  prestasis: ({
    id: UUIDString;
    nama: string;
    tipe: TipePrestasi;
    tingkat: string;
    peringkat: string;
    tanggal: DateString;
    deskripsi?: string | null;
  } & Prestasi_Key)[];
}
```
### Using `ListPrestasi`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPrestasi, ListPrestasiVariables } from '@uassiakad/connector';

// The `ListPrestasi` query has an optional argument of type `ListPrestasiVariables`:
const listPrestasiVars: ListPrestasiVariables = {
  siswaId: ..., // optional
};

// Call the `listPrestasi()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPrestasi(listPrestasiVars);
// Variables can be defined inline as well.
const { data } = await listPrestasi({ siswaId: ..., });
// Since all variables are optional for this query, you can omit the `ListPrestasiVariables` argument.
const { data } = await listPrestasi();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPrestasi(dataConnect, listPrestasiVars);

console.log(data.prestasis);

// Or, you can use the `Promise` API.
listPrestasi(listPrestasiVars).then((response) => {
  const data = response.data;
  console.log(data.prestasis);
});
```

### Using `ListPrestasi`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPrestasiRef, ListPrestasiVariables } from '@uassiakad/connector';

// The `ListPrestasi` query has an optional argument of type `ListPrestasiVariables`:
const listPrestasiVars: ListPrestasiVariables = {
  siswaId: ..., // optional
};

// Call the `listPrestasiRef()` function to get a reference to the query.
const ref = listPrestasiRef(listPrestasiVars);
// Variables can be defined inline as well.
const ref = listPrestasiRef({ siswaId: ..., });
// Since all variables are optional for this query, you can omit the `ListPrestasiVariables` argument.
const ref = listPrestasiRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPrestasiRef(dataConnect, listPrestasiVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.prestasis);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.prestasis);
});
```

## ListAlumni
You can execute the `ListAlumni` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listAlumni(vars?: ListAlumniVariables): QueryPromise<ListAlumniData, ListAlumniVariables>;

interface ListAlumniRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListAlumniVariables): QueryRef<ListAlumniData, ListAlumniVariables>;
}
export const listAlumniRef: ListAlumniRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAlumni(dc: DataConnect, vars?: ListAlumniVariables): QueryPromise<ListAlumniData, ListAlumniVariables>;

interface ListAlumniRef {
  ...
  (dc: DataConnect, vars?: ListAlumniVariables): QueryRef<ListAlumniData, ListAlumniVariables>;
}
export const listAlumniRef: ListAlumniRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAlumniRef:
```typescript
const name = listAlumniRef.operationName;
console.log(name);
```

### Variables
The `ListAlumni` query has an optional argument of type `ListAlumniVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAlumniVariables {
  tahunLulus?: number | null;
}
```
### Return Type
Recall that executing the `ListAlumni` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAlumniData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAlumniData {
  alumnis: ({
    id: UUIDString;
    nis: string;
    nama: string;
    tahunLulus: number;
    status: StatusAlumni;
    institusi?: string | null;
    jabatanAtauJurusan?: string | null;
    email?: string | null;
    telepon?: string | null;
    alamat?: string | null;
    prestasi?: string | null;
  } & Alumni_Key)[];
}
```
### Using `ListAlumni`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAlumni, ListAlumniVariables } from '@uassiakad/connector';

// The `ListAlumni` query has an optional argument of type `ListAlumniVariables`:
const listAlumniVars: ListAlumniVariables = {
  tahunLulus: ..., // optional
};

// Call the `listAlumni()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAlumni(listAlumniVars);
// Variables can be defined inline as well.
const { data } = await listAlumni({ tahunLulus: ..., });
// Since all variables are optional for this query, you can omit the `ListAlumniVariables` argument.
const { data } = await listAlumni();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAlumni(dataConnect, listAlumniVars);

console.log(data.alumnis);

// Or, you can use the `Promise` API.
listAlumni(listAlumniVars).then((response) => {
  const data = response.data;
  console.log(data.alumnis);
});
```

### Using `ListAlumni`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAlumniRef, ListAlumniVariables } from '@uassiakad/connector';

// The `ListAlumni` query has an optional argument of type `ListAlumniVariables`:
const listAlumniVars: ListAlumniVariables = {
  tahunLulus: ..., // optional
};

// Call the `listAlumniRef()` function to get a reference to the query.
const ref = listAlumniRef(listAlumniVars);
// Variables can be defined inline as well.
const ref = listAlumniRef({ tahunLulus: ..., });
// Since all variables are optional for this query, you can omit the `ListAlumniVariables` argument.
const ref = listAlumniRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAlumniRef(dataConnect, listAlumniVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.alumnis);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.alumnis);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `uassiakad-connector` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreatePengguna
You can execute the `CreatePengguna` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createPengguna(vars: CreatePenggunaVariables): MutationPromise<CreatePenggunaData, CreatePenggunaVariables>;

interface CreatePenggunaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePenggunaVariables): MutationRef<CreatePenggunaData, CreatePenggunaVariables>;
}
export const createPenggunaRef: CreatePenggunaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPengguna(dc: DataConnect, vars: CreatePenggunaVariables): MutationPromise<CreatePenggunaData, CreatePenggunaVariables>;

interface CreatePenggunaRef {
  ...
  (dc: DataConnect, vars: CreatePenggunaVariables): MutationRef<CreatePenggunaData, CreatePenggunaVariables>;
}
export const createPenggunaRef: CreatePenggunaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPenggunaRef:
```typescript
const name = createPenggunaRef.operationName;
console.log(name);
```

### Variables
The `CreatePengguna` mutation requires an argument of type `CreatePenggunaVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePenggunaVariables {
  email: string;
  password?: string | null;
  nama: string;
  peran: PeranPengguna;
  telepon?: string | null;
  alamat?: string | null;
  fotoUrl?: string | null;
}
```
### Return Type
Recall that executing the `CreatePengguna` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePenggunaData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePenggunaData {
  pengguna_insert: Pengguna_Key;
}
```
### Using `CreatePengguna`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPengguna, CreatePenggunaVariables } from '@uassiakad/connector';

// The `CreatePengguna` mutation requires an argument of type `CreatePenggunaVariables`:
const createPenggunaVars: CreatePenggunaVariables = {
  email: ..., 
  password: ..., // optional
  nama: ..., 
  peran: ..., 
  telepon: ..., // optional
  alamat: ..., // optional
  fotoUrl: ..., // optional
};

// Call the `createPengguna()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPengguna(createPenggunaVars);
// Variables can be defined inline as well.
const { data } = await createPengguna({ email: ..., password: ..., nama: ..., peran: ..., telepon: ..., alamat: ..., fotoUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPengguna(dataConnect, createPenggunaVars);

console.log(data.pengguna_insert);

// Or, you can use the `Promise` API.
createPengguna(createPenggunaVars).then((response) => {
  const data = response.data;
  console.log(data.pengguna_insert);
});
```

### Using `CreatePengguna`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPenggunaRef, CreatePenggunaVariables } from '@uassiakad/connector';

// The `CreatePengguna` mutation requires an argument of type `CreatePenggunaVariables`:
const createPenggunaVars: CreatePenggunaVariables = {
  email: ..., 
  password: ..., // optional
  nama: ..., 
  peran: ..., 
  telepon: ..., // optional
  alamat: ..., // optional
  fotoUrl: ..., // optional
};

// Call the `createPenggunaRef()` function to get a reference to the mutation.
const ref = createPenggunaRef(createPenggunaVars);
// Variables can be defined inline as well.
const ref = createPenggunaRef({ email: ..., password: ..., nama: ..., peran: ..., telepon: ..., alamat: ..., fotoUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPenggunaRef(dataConnect, createPenggunaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.pengguna_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.pengguna_insert);
});
```

## UpdatePengguna
You can execute the `UpdatePengguna` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updatePengguna(vars: UpdatePenggunaVariables): MutationPromise<UpdatePenggunaData, UpdatePenggunaVariables>;

interface UpdatePenggunaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePenggunaVariables): MutationRef<UpdatePenggunaData, UpdatePenggunaVariables>;
}
export const updatePenggunaRef: UpdatePenggunaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePengguna(dc: DataConnect, vars: UpdatePenggunaVariables): MutationPromise<UpdatePenggunaData, UpdatePenggunaVariables>;

interface UpdatePenggunaRef {
  ...
  (dc: DataConnect, vars: UpdatePenggunaVariables): MutationRef<UpdatePenggunaData, UpdatePenggunaVariables>;
}
export const updatePenggunaRef: UpdatePenggunaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePenggunaRef:
```typescript
const name = updatePenggunaRef.operationName;
console.log(name);
```

### Variables
The `UpdatePengguna` mutation requires an argument of type `UpdatePenggunaVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePenggunaVariables {
  id: UUIDString;
  password?: string | null;
  nama?: string | null;
  telepon?: string | null;
  alamat?: string | null;
  fotoUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpdatePengguna` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePenggunaData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePenggunaData {
  pengguna_update?: Pengguna_Key | null;
}
```
### Using `UpdatePengguna`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePengguna, UpdatePenggunaVariables } from '@uassiakad/connector';

// The `UpdatePengguna` mutation requires an argument of type `UpdatePenggunaVariables`:
const updatePenggunaVars: UpdatePenggunaVariables = {
  id: ..., 
  password: ..., // optional
  nama: ..., // optional
  telepon: ..., // optional
  alamat: ..., // optional
  fotoUrl: ..., // optional
};

// Call the `updatePengguna()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePengguna(updatePenggunaVars);
// Variables can be defined inline as well.
const { data } = await updatePengguna({ id: ..., password: ..., nama: ..., telepon: ..., alamat: ..., fotoUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePengguna(dataConnect, updatePenggunaVars);

console.log(data.pengguna_update);

// Or, you can use the `Promise` API.
updatePengguna(updatePenggunaVars).then((response) => {
  const data = response.data;
  console.log(data.pengguna_update);
});
```

### Using `UpdatePengguna`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePenggunaRef, UpdatePenggunaVariables } from '@uassiakad/connector';

// The `UpdatePengguna` mutation requires an argument of type `UpdatePenggunaVariables`:
const updatePenggunaVars: UpdatePenggunaVariables = {
  id: ..., 
  password: ..., // optional
  nama: ..., // optional
  telepon: ..., // optional
  alamat: ..., // optional
  fotoUrl: ..., // optional
};

// Call the `updatePenggunaRef()` function to get a reference to the mutation.
const ref = updatePenggunaRef(updatePenggunaVars);
// Variables can be defined inline as well.
const ref = updatePenggunaRef({ id: ..., password: ..., nama: ..., telepon: ..., alamat: ..., fotoUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePenggunaRef(dataConnect, updatePenggunaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.pengguna_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.pengguna_update);
});
```

## DeletePengguna
You can execute the `DeletePengguna` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deletePengguna(vars: DeletePenggunaVariables): MutationPromise<DeletePenggunaData, DeletePenggunaVariables>;

interface DeletePenggunaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePenggunaVariables): MutationRef<DeletePenggunaData, DeletePenggunaVariables>;
}
export const deletePenggunaRef: DeletePenggunaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePengguna(dc: DataConnect, vars: DeletePenggunaVariables): MutationPromise<DeletePenggunaData, DeletePenggunaVariables>;

interface DeletePenggunaRef {
  ...
  (dc: DataConnect, vars: DeletePenggunaVariables): MutationRef<DeletePenggunaData, DeletePenggunaVariables>;
}
export const deletePenggunaRef: DeletePenggunaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePenggunaRef:
```typescript
const name = deletePenggunaRef.operationName;
console.log(name);
```

### Variables
The `DeletePengguna` mutation requires an argument of type `DeletePenggunaVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePenggunaVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeletePengguna` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePenggunaData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePenggunaData {
  pengguna_delete?: Pengguna_Key | null;
}
```
### Using `DeletePengguna`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePengguna, DeletePenggunaVariables } from '@uassiakad/connector';

// The `DeletePengguna` mutation requires an argument of type `DeletePenggunaVariables`:
const deletePenggunaVars: DeletePenggunaVariables = {
  id: ..., 
};

// Call the `deletePengguna()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePengguna(deletePenggunaVars);
// Variables can be defined inline as well.
const { data } = await deletePengguna({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePengguna(dataConnect, deletePenggunaVars);

console.log(data.pengguna_delete);

// Or, you can use the `Promise` API.
deletePengguna(deletePenggunaVars).then((response) => {
  const data = response.data;
  console.log(data.pengguna_delete);
});
```

### Using `DeletePengguna`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePenggunaRef, DeletePenggunaVariables } from '@uassiakad/connector';

// The `DeletePengguna` mutation requires an argument of type `DeletePenggunaVariables`:
const deletePenggunaVars: DeletePenggunaVariables = {
  id: ..., 
};

// Call the `deletePenggunaRef()` function to get a reference to the mutation.
const ref = deletePenggunaRef(deletePenggunaVars);
// Variables can be defined inline as well.
const ref = deletePenggunaRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePenggunaRef(dataConnect, deletePenggunaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.pengguna_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.pengguna_delete);
});
```

## CreateGuru
You can execute the `CreateGuru` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createGuru(vars: CreateGuruVariables): MutationPromise<CreateGuruData, CreateGuruVariables>;

interface CreateGuruRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGuruVariables): MutationRef<CreateGuruData, CreateGuruVariables>;
}
export const createGuruRef: CreateGuruRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createGuru(dc: DataConnect, vars: CreateGuruVariables): MutationPromise<CreateGuruData, CreateGuruVariables>;

interface CreateGuruRef {
  ...
  (dc: DataConnect, vars: CreateGuruVariables): MutationRef<CreateGuruData, CreateGuruVariables>;
}
export const createGuruRef: CreateGuruRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createGuruRef:
```typescript
const name = createGuruRef.operationName;
console.log(name);
```

### Variables
The `CreateGuru` mutation requires an argument of type `CreateGuruVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateGuruVariables {
  penggunaId: UUIDString;
  nip: string;
  jenisKelamin: JenisKelamin;
  tempatLahir?: string | null;
  tanggalLahir?: DateString | null;
  jabatan?: JabatanGuru | null;
  spesialisasi?: string | null;
}
```
### Return Type
Recall that executing the `CreateGuru` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateGuruData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateGuruData {
  guru_insert: Guru_Key;
}
```
### Using `CreateGuru`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createGuru, CreateGuruVariables } from '@uassiakad/connector';

// The `CreateGuru` mutation requires an argument of type `CreateGuruVariables`:
const createGuruVars: CreateGuruVariables = {
  penggunaId: ..., 
  nip: ..., 
  jenisKelamin: ..., 
  tempatLahir: ..., // optional
  tanggalLahir: ..., // optional
  jabatan: ..., // optional
  spesialisasi: ..., // optional
};

// Call the `createGuru()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createGuru(createGuruVars);
// Variables can be defined inline as well.
const { data } = await createGuru({ penggunaId: ..., nip: ..., jenisKelamin: ..., tempatLahir: ..., tanggalLahir: ..., jabatan: ..., spesialisasi: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createGuru(dataConnect, createGuruVars);

console.log(data.guru_insert);

// Or, you can use the `Promise` API.
createGuru(createGuruVars).then((response) => {
  const data = response.data;
  console.log(data.guru_insert);
});
```

### Using `CreateGuru`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createGuruRef, CreateGuruVariables } from '@uassiakad/connector';

// The `CreateGuru` mutation requires an argument of type `CreateGuruVariables`:
const createGuruVars: CreateGuruVariables = {
  penggunaId: ..., 
  nip: ..., 
  jenisKelamin: ..., 
  tempatLahir: ..., // optional
  tanggalLahir: ..., // optional
  jabatan: ..., // optional
  spesialisasi: ..., // optional
};

// Call the `createGuruRef()` function to get a reference to the mutation.
const ref = createGuruRef(createGuruVars);
// Variables can be defined inline as well.
const ref = createGuruRef({ penggunaId: ..., nip: ..., jenisKelamin: ..., tempatLahir: ..., tanggalLahir: ..., jabatan: ..., spesialisasi: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createGuruRef(dataConnect, createGuruVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.guru_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.guru_insert);
});
```

## UpdateGuru
You can execute the `UpdateGuru` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateGuru(vars: UpdateGuruVariables): MutationPromise<UpdateGuruData, UpdateGuruVariables>;

interface UpdateGuruRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGuruVariables): MutationRef<UpdateGuruData, UpdateGuruVariables>;
}
export const updateGuruRef: UpdateGuruRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateGuru(dc: DataConnect, vars: UpdateGuruVariables): MutationPromise<UpdateGuruData, UpdateGuruVariables>;

interface UpdateGuruRef {
  ...
  (dc: DataConnect, vars: UpdateGuruVariables): MutationRef<UpdateGuruData, UpdateGuruVariables>;
}
export const updateGuruRef: UpdateGuruRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateGuruRef:
```typescript
const name = updateGuruRef.operationName;
console.log(name);
```

### Variables
The `UpdateGuru` mutation requires an argument of type `UpdateGuruVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateGuruVariables {
  id: UUIDString;
  jabatan?: JabatanGuru | null;
  spesialisasi?: string | null;
  tempatLahir?: string | null;
  tanggalLahir?: DateString | null;
}
```
### Return Type
Recall that executing the `UpdateGuru` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateGuruData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateGuruData {
  guru_update?: Guru_Key | null;
}
```
### Using `UpdateGuru`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateGuru, UpdateGuruVariables } from '@uassiakad/connector';

// The `UpdateGuru` mutation requires an argument of type `UpdateGuruVariables`:
const updateGuruVars: UpdateGuruVariables = {
  id: ..., 
  jabatan: ..., // optional
  spesialisasi: ..., // optional
  tempatLahir: ..., // optional
  tanggalLahir: ..., // optional
};

// Call the `updateGuru()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateGuru(updateGuruVars);
// Variables can be defined inline as well.
const { data } = await updateGuru({ id: ..., jabatan: ..., spesialisasi: ..., tempatLahir: ..., tanggalLahir: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateGuru(dataConnect, updateGuruVars);

console.log(data.guru_update);

// Or, you can use the `Promise` API.
updateGuru(updateGuruVars).then((response) => {
  const data = response.data;
  console.log(data.guru_update);
});
```

### Using `UpdateGuru`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateGuruRef, UpdateGuruVariables } from '@uassiakad/connector';

// The `UpdateGuru` mutation requires an argument of type `UpdateGuruVariables`:
const updateGuruVars: UpdateGuruVariables = {
  id: ..., 
  jabatan: ..., // optional
  spesialisasi: ..., // optional
  tempatLahir: ..., // optional
  tanggalLahir: ..., // optional
};

// Call the `updateGuruRef()` function to get a reference to the mutation.
const ref = updateGuruRef(updateGuruVars);
// Variables can be defined inline as well.
const ref = updateGuruRef({ id: ..., jabatan: ..., spesialisasi: ..., tempatLahir: ..., tanggalLahir: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateGuruRef(dataConnect, updateGuruVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.guru_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.guru_update);
});
```

## DeleteGuru
You can execute the `DeleteGuru` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deleteGuru(vars: DeleteGuruVariables): MutationPromise<DeleteGuruData, DeleteGuruVariables>;

interface DeleteGuruRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteGuruVariables): MutationRef<DeleteGuruData, DeleteGuruVariables>;
}
export const deleteGuruRef: DeleteGuruRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteGuru(dc: DataConnect, vars: DeleteGuruVariables): MutationPromise<DeleteGuruData, DeleteGuruVariables>;

interface DeleteGuruRef {
  ...
  (dc: DataConnect, vars: DeleteGuruVariables): MutationRef<DeleteGuruData, DeleteGuruVariables>;
}
export const deleteGuruRef: DeleteGuruRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteGuruRef:
```typescript
const name = deleteGuruRef.operationName;
console.log(name);
```

### Variables
The `DeleteGuru` mutation requires an argument of type `DeleteGuruVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteGuruVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteGuru` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteGuruData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteGuruData {
  guru_delete?: Guru_Key | null;
}
```
### Using `DeleteGuru`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteGuru, DeleteGuruVariables } from '@uassiakad/connector';

// The `DeleteGuru` mutation requires an argument of type `DeleteGuruVariables`:
const deleteGuruVars: DeleteGuruVariables = {
  id: ..., 
};

// Call the `deleteGuru()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteGuru(deleteGuruVars);
// Variables can be defined inline as well.
const { data } = await deleteGuru({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteGuru(dataConnect, deleteGuruVars);

console.log(data.guru_delete);

// Or, you can use the `Promise` API.
deleteGuru(deleteGuruVars).then((response) => {
  const data = response.data;
  console.log(data.guru_delete);
});
```

### Using `DeleteGuru`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteGuruRef, DeleteGuruVariables } from '@uassiakad/connector';

// The `DeleteGuru` mutation requires an argument of type `DeleteGuruVariables`:
const deleteGuruVars: DeleteGuruVariables = {
  id: ..., 
};

// Call the `deleteGuruRef()` function to get a reference to the mutation.
const ref = deleteGuruRef(deleteGuruVars);
// Variables can be defined inline as well.
const ref = deleteGuruRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteGuruRef(dataConnect, deleteGuruVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.guru_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.guru_delete);
});
```

## CreateSiswa
You can execute the `CreateSiswa` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createSiswa(vars: CreateSiswaVariables): MutationPromise<CreateSiswaData, CreateSiswaVariables>;

interface CreateSiswaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSiswaVariables): MutationRef<CreateSiswaData, CreateSiswaVariables>;
}
export const createSiswaRef: CreateSiswaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSiswa(dc: DataConnect, vars: CreateSiswaVariables): MutationPromise<CreateSiswaData, CreateSiswaVariables>;

interface CreateSiswaRef {
  ...
  (dc: DataConnect, vars: CreateSiswaVariables): MutationRef<CreateSiswaData, CreateSiswaVariables>;
}
export const createSiswaRef: CreateSiswaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSiswaRef:
```typescript
const name = createSiswaRef.operationName;
console.log(name);
```

### Variables
The `CreateSiswa` mutation requires an argument of type `CreateSiswaVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSiswaVariables {
  penggunaId: UUIDString;
  nis: string;
  jenisKelamin: JenisKelamin;
  tempatLahir?: string | null;
  tanggalLahir?: DateString | null;
  alamat?: string | null;
  jurusanId?: UUIDString | null;
  kelasId?: UUIDString | null;
  tahunMasuk?: number | null;
}
```
### Return Type
Recall that executing the `CreateSiswa` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSiswaData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSiswaData {
  siswa_insert: Siswa_Key;
}
```
### Using `CreateSiswa`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSiswa, CreateSiswaVariables } from '@uassiakad/connector';

// The `CreateSiswa` mutation requires an argument of type `CreateSiswaVariables`:
const createSiswaVars: CreateSiswaVariables = {
  penggunaId: ..., 
  nis: ..., 
  jenisKelamin: ..., 
  tempatLahir: ..., // optional
  tanggalLahir: ..., // optional
  alamat: ..., // optional
  jurusanId: ..., // optional
  kelasId: ..., // optional
  tahunMasuk: ..., // optional
};

// Call the `createSiswa()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSiswa(createSiswaVars);
// Variables can be defined inline as well.
const { data } = await createSiswa({ penggunaId: ..., nis: ..., jenisKelamin: ..., tempatLahir: ..., tanggalLahir: ..., alamat: ..., jurusanId: ..., kelasId: ..., tahunMasuk: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSiswa(dataConnect, createSiswaVars);

console.log(data.siswa_insert);

// Or, you can use the `Promise` API.
createSiswa(createSiswaVars).then((response) => {
  const data = response.data;
  console.log(data.siswa_insert);
});
```

### Using `CreateSiswa`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSiswaRef, CreateSiswaVariables } from '@uassiakad/connector';

// The `CreateSiswa` mutation requires an argument of type `CreateSiswaVariables`:
const createSiswaVars: CreateSiswaVariables = {
  penggunaId: ..., 
  nis: ..., 
  jenisKelamin: ..., 
  tempatLahir: ..., // optional
  tanggalLahir: ..., // optional
  alamat: ..., // optional
  jurusanId: ..., // optional
  kelasId: ..., // optional
  tahunMasuk: ..., // optional
};

// Call the `createSiswaRef()` function to get a reference to the mutation.
const ref = createSiswaRef(createSiswaVars);
// Variables can be defined inline as well.
const ref = createSiswaRef({ penggunaId: ..., nis: ..., jenisKelamin: ..., tempatLahir: ..., tanggalLahir: ..., alamat: ..., jurusanId: ..., kelasId: ..., tahunMasuk: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSiswaRef(dataConnect, createSiswaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.siswa_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.siswa_insert);
});
```

## UpdateSiswa
You can execute the `UpdateSiswa` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateSiswa(vars: UpdateSiswaVariables): MutationPromise<UpdateSiswaData, UpdateSiswaVariables>;

interface UpdateSiswaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSiswaVariables): MutationRef<UpdateSiswaData, UpdateSiswaVariables>;
}
export const updateSiswaRef: UpdateSiswaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSiswa(dc: DataConnect, vars: UpdateSiswaVariables): MutationPromise<UpdateSiswaData, UpdateSiswaVariables>;

interface UpdateSiswaRef {
  ...
  (dc: DataConnect, vars: UpdateSiswaVariables): MutationRef<UpdateSiswaData, UpdateSiswaVariables>;
}
export const updateSiswaRef: UpdateSiswaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSiswaRef:
```typescript
const name = updateSiswaRef.operationName;
console.log(name);
```

### Variables
The `UpdateSiswa` mutation requires an argument of type `UpdateSiswaVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSiswaVariables {
  id: UUIDString;
  jurusanId?: UUIDString | null;
  kelasId?: UUIDString | null;
  tanggalLahir?: DateString | null;
  tempatLahir?: string | null;
  alamat?: string | null;
}
```
### Return Type
Recall that executing the `UpdateSiswa` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSiswaData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSiswaData {
  siswa_update?: Siswa_Key | null;
}
```
### Using `UpdateSiswa`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSiswa, UpdateSiswaVariables } from '@uassiakad/connector';

// The `UpdateSiswa` mutation requires an argument of type `UpdateSiswaVariables`:
const updateSiswaVars: UpdateSiswaVariables = {
  id: ..., 
  jurusanId: ..., // optional
  kelasId: ..., // optional
  tanggalLahir: ..., // optional
  tempatLahir: ..., // optional
  alamat: ..., // optional
};

// Call the `updateSiswa()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSiswa(updateSiswaVars);
// Variables can be defined inline as well.
const { data } = await updateSiswa({ id: ..., jurusanId: ..., kelasId: ..., tanggalLahir: ..., tempatLahir: ..., alamat: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSiswa(dataConnect, updateSiswaVars);

console.log(data.siswa_update);

// Or, you can use the `Promise` API.
updateSiswa(updateSiswaVars).then((response) => {
  const data = response.data;
  console.log(data.siswa_update);
});
```

### Using `UpdateSiswa`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSiswaRef, UpdateSiswaVariables } from '@uassiakad/connector';

// The `UpdateSiswa` mutation requires an argument of type `UpdateSiswaVariables`:
const updateSiswaVars: UpdateSiswaVariables = {
  id: ..., 
  jurusanId: ..., // optional
  kelasId: ..., // optional
  tanggalLahir: ..., // optional
  tempatLahir: ..., // optional
  alamat: ..., // optional
};

// Call the `updateSiswaRef()` function to get a reference to the mutation.
const ref = updateSiswaRef(updateSiswaVars);
// Variables can be defined inline as well.
const ref = updateSiswaRef({ id: ..., jurusanId: ..., kelasId: ..., tanggalLahir: ..., tempatLahir: ..., alamat: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSiswaRef(dataConnect, updateSiswaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.siswa_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.siswa_update);
});
```

## UpdateSiswaPeminatan
You can execute the `UpdateSiswaPeminatan` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateSiswaPeminatan(vars: UpdateSiswaPeminatanVariables): MutationPromise<UpdateSiswaPeminatanData, UpdateSiswaPeminatanVariables>;

interface UpdateSiswaPeminatanRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSiswaPeminatanVariables): MutationRef<UpdateSiswaPeminatanData, UpdateSiswaPeminatanVariables>;
}
export const updateSiswaPeminatanRef: UpdateSiswaPeminatanRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSiswaPeminatan(dc: DataConnect, vars: UpdateSiswaPeminatanVariables): MutationPromise<UpdateSiswaPeminatanData, UpdateSiswaPeminatanVariables>;

interface UpdateSiswaPeminatanRef {
  ...
  (dc: DataConnect, vars: UpdateSiswaPeminatanVariables): MutationRef<UpdateSiswaPeminatanData, UpdateSiswaPeminatanVariables>;
}
export const updateSiswaPeminatanRef: UpdateSiswaPeminatanRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSiswaPeminatanRef:
```typescript
const name = updateSiswaPeminatanRef.operationName;
console.log(name);
```

### Variables
The `UpdateSiswaPeminatan` mutation requires an argument of type `UpdateSiswaPeminatanVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSiswaPeminatanVariables {
  id: UUIDString;
  peminatanId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `UpdateSiswaPeminatan` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSiswaPeminatanData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSiswaPeminatanData {
  siswa_update?: Siswa_Key | null;
}
```
### Using `UpdateSiswaPeminatan`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSiswaPeminatan, UpdateSiswaPeminatanVariables } from '@uassiakad/connector';

// The `UpdateSiswaPeminatan` mutation requires an argument of type `UpdateSiswaPeminatanVariables`:
const updateSiswaPeminatanVars: UpdateSiswaPeminatanVariables = {
  id: ..., 
  peminatanId: ..., // optional
};

// Call the `updateSiswaPeminatan()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSiswaPeminatan(updateSiswaPeminatanVars);
// Variables can be defined inline as well.
const { data } = await updateSiswaPeminatan({ id: ..., peminatanId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSiswaPeminatan(dataConnect, updateSiswaPeminatanVars);

console.log(data.siswa_update);

// Or, you can use the `Promise` API.
updateSiswaPeminatan(updateSiswaPeminatanVars).then((response) => {
  const data = response.data;
  console.log(data.siswa_update);
});
```

### Using `UpdateSiswaPeminatan`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSiswaPeminatanRef, UpdateSiswaPeminatanVariables } from '@uassiakad/connector';

// The `UpdateSiswaPeminatan` mutation requires an argument of type `UpdateSiswaPeminatanVariables`:
const updateSiswaPeminatanVars: UpdateSiswaPeminatanVariables = {
  id: ..., 
  peminatanId: ..., // optional
};

// Call the `updateSiswaPeminatanRef()` function to get a reference to the mutation.
const ref = updateSiswaPeminatanRef(updateSiswaPeminatanVars);
// Variables can be defined inline as well.
const ref = updateSiswaPeminatanRef({ id: ..., peminatanId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSiswaPeminatanRef(dataConnect, updateSiswaPeminatanVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.siswa_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.siswa_update);
});
```

## DeleteSiswa
You can execute the `DeleteSiswa` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deleteSiswa(vars: DeleteSiswaVariables): MutationPromise<DeleteSiswaData, DeleteSiswaVariables>;

interface DeleteSiswaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSiswaVariables): MutationRef<DeleteSiswaData, DeleteSiswaVariables>;
}
export const deleteSiswaRef: DeleteSiswaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSiswa(dc: DataConnect, vars: DeleteSiswaVariables): MutationPromise<DeleteSiswaData, DeleteSiswaVariables>;

interface DeleteSiswaRef {
  ...
  (dc: DataConnect, vars: DeleteSiswaVariables): MutationRef<DeleteSiswaData, DeleteSiswaVariables>;
}
export const deleteSiswaRef: DeleteSiswaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteSiswaRef:
```typescript
const name = deleteSiswaRef.operationName;
console.log(name);
```

### Variables
The `DeleteSiswa` mutation requires an argument of type `DeleteSiswaVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteSiswaVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteSiswa` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteSiswaData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteSiswaData {
  siswa_delete?: Siswa_Key | null;
}
```
### Using `DeleteSiswa`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSiswa, DeleteSiswaVariables } from '@uassiakad/connector';

// The `DeleteSiswa` mutation requires an argument of type `DeleteSiswaVariables`:
const deleteSiswaVars: DeleteSiswaVariables = {
  id: ..., 
};

// Call the `deleteSiswa()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSiswa(deleteSiswaVars);
// Variables can be defined inline as well.
const { data } = await deleteSiswa({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSiswa(dataConnect, deleteSiswaVars);

console.log(data.siswa_delete);

// Or, you can use the `Promise` API.
deleteSiswa(deleteSiswaVars).then((response) => {
  const data = response.data;
  console.log(data.siswa_delete);
});
```

### Using `DeleteSiswa`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteSiswaRef, DeleteSiswaVariables } from '@uassiakad/connector';

// The `DeleteSiswa` mutation requires an argument of type `DeleteSiswaVariables`:
const deleteSiswaVars: DeleteSiswaVariables = {
  id: ..., 
};

// Call the `deleteSiswaRef()` function to get a reference to the mutation.
const ref = deleteSiswaRef(deleteSiswaVars);
// Variables can be defined inline as well.
const ref = deleteSiswaRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteSiswaRef(dataConnect, deleteSiswaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.siswa_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.siswa_delete);
});
```

## CreateKelas
You can execute the `CreateKelas` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createKelas(vars: CreateKelasVariables): MutationPromise<CreateKelasData, CreateKelasVariables>;

interface CreateKelasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateKelasVariables): MutationRef<CreateKelasData, CreateKelasVariables>;
}
export const createKelasRef: CreateKelasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createKelas(dc: DataConnect, vars: CreateKelasVariables): MutationPromise<CreateKelasData, CreateKelasVariables>;

interface CreateKelasRef {
  ...
  (dc: DataConnect, vars: CreateKelasVariables): MutationRef<CreateKelasData, CreateKelasVariables>;
}
export const createKelasRef: CreateKelasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createKelasRef:
```typescript
const name = createKelasRef.operationName;
console.log(name);
```

### Variables
The `CreateKelas` mutation requires an argument of type `CreateKelasVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateKelasVariables {
  nama: string;
  tingkat: number;
  tahunAjaran: string;
  jurusanId?: UUIDString | null;
  waliKelasId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateKelas` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateKelasData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateKelasData {
  kelas_insert: Kelas_Key;
}
```
### Using `CreateKelas`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createKelas, CreateKelasVariables } from '@uassiakad/connector';

// The `CreateKelas` mutation requires an argument of type `CreateKelasVariables`:
const createKelasVars: CreateKelasVariables = {
  nama: ..., 
  tingkat: ..., 
  tahunAjaran: ..., 
  jurusanId: ..., // optional
  waliKelasId: ..., // optional
};

// Call the `createKelas()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createKelas(createKelasVars);
// Variables can be defined inline as well.
const { data } = await createKelas({ nama: ..., tingkat: ..., tahunAjaran: ..., jurusanId: ..., waliKelasId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createKelas(dataConnect, createKelasVars);

console.log(data.kelas_insert);

// Or, you can use the `Promise` API.
createKelas(createKelasVars).then((response) => {
  const data = response.data;
  console.log(data.kelas_insert);
});
```

### Using `CreateKelas`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createKelasRef, CreateKelasVariables } from '@uassiakad/connector';

// The `CreateKelas` mutation requires an argument of type `CreateKelasVariables`:
const createKelasVars: CreateKelasVariables = {
  nama: ..., 
  tingkat: ..., 
  tahunAjaran: ..., 
  jurusanId: ..., // optional
  waliKelasId: ..., // optional
};

// Call the `createKelasRef()` function to get a reference to the mutation.
const ref = createKelasRef(createKelasVars);
// Variables can be defined inline as well.
const ref = createKelasRef({ nama: ..., tingkat: ..., tahunAjaran: ..., jurusanId: ..., waliKelasId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createKelasRef(dataConnect, createKelasVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.kelas_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.kelas_insert);
});
```

## UpdateKelas
You can execute the `UpdateKelas` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateKelas(vars: UpdateKelasVariables): MutationPromise<UpdateKelasData, UpdateKelasVariables>;

interface UpdateKelasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateKelasVariables): MutationRef<UpdateKelasData, UpdateKelasVariables>;
}
export const updateKelasRef: UpdateKelasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateKelas(dc: DataConnect, vars: UpdateKelasVariables): MutationPromise<UpdateKelasData, UpdateKelasVariables>;

interface UpdateKelasRef {
  ...
  (dc: DataConnect, vars: UpdateKelasVariables): MutationRef<UpdateKelasData, UpdateKelasVariables>;
}
export const updateKelasRef: UpdateKelasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateKelasRef:
```typescript
const name = updateKelasRef.operationName;
console.log(name);
```

### Variables
The `UpdateKelas` mutation requires an argument of type `UpdateKelasVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateKelasVariables {
  id: UUIDString;
  nama?: string | null;
  tingkat?: number | null;
  waliKelasId?: UUIDString | null;
  jurusanId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `UpdateKelas` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateKelasData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateKelasData {
  kelas_update?: Kelas_Key | null;
}
```
### Using `UpdateKelas`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateKelas, UpdateKelasVariables } from '@uassiakad/connector';

// The `UpdateKelas` mutation requires an argument of type `UpdateKelasVariables`:
const updateKelasVars: UpdateKelasVariables = {
  id: ..., 
  nama: ..., // optional
  tingkat: ..., // optional
  waliKelasId: ..., // optional
  jurusanId: ..., // optional
};

// Call the `updateKelas()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateKelas(updateKelasVars);
// Variables can be defined inline as well.
const { data } = await updateKelas({ id: ..., nama: ..., tingkat: ..., waliKelasId: ..., jurusanId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateKelas(dataConnect, updateKelasVars);

console.log(data.kelas_update);

// Or, you can use the `Promise` API.
updateKelas(updateKelasVars).then((response) => {
  const data = response.data;
  console.log(data.kelas_update);
});
```

### Using `UpdateKelas`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateKelasRef, UpdateKelasVariables } from '@uassiakad/connector';

// The `UpdateKelas` mutation requires an argument of type `UpdateKelasVariables`:
const updateKelasVars: UpdateKelasVariables = {
  id: ..., 
  nama: ..., // optional
  tingkat: ..., // optional
  waliKelasId: ..., // optional
  jurusanId: ..., // optional
};

// Call the `updateKelasRef()` function to get a reference to the mutation.
const ref = updateKelasRef(updateKelasVars);
// Variables can be defined inline as well.
const ref = updateKelasRef({ id: ..., nama: ..., tingkat: ..., waliKelasId: ..., jurusanId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateKelasRef(dataConnect, updateKelasVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.kelas_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.kelas_update);
});
```

## DeleteKelas
You can execute the `DeleteKelas` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deleteKelas(vars: DeleteKelasVariables): MutationPromise<DeleteKelasData, DeleteKelasVariables>;

interface DeleteKelasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteKelasVariables): MutationRef<DeleteKelasData, DeleteKelasVariables>;
}
export const deleteKelasRef: DeleteKelasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteKelas(dc: DataConnect, vars: DeleteKelasVariables): MutationPromise<DeleteKelasData, DeleteKelasVariables>;

interface DeleteKelasRef {
  ...
  (dc: DataConnect, vars: DeleteKelasVariables): MutationRef<DeleteKelasData, DeleteKelasVariables>;
}
export const deleteKelasRef: DeleteKelasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteKelasRef:
```typescript
const name = deleteKelasRef.operationName;
console.log(name);
```

### Variables
The `DeleteKelas` mutation requires an argument of type `DeleteKelasVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteKelasVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteKelas` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteKelasData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteKelasData {
  kelas_delete?: Kelas_Key | null;
}
```
### Using `DeleteKelas`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteKelas, DeleteKelasVariables } from '@uassiakad/connector';

// The `DeleteKelas` mutation requires an argument of type `DeleteKelasVariables`:
const deleteKelasVars: DeleteKelasVariables = {
  id: ..., 
};

// Call the `deleteKelas()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteKelas(deleteKelasVars);
// Variables can be defined inline as well.
const { data } = await deleteKelas({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteKelas(dataConnect, deleteKelasVars);

console.log(data.kelas_delete);

// Or, you can use the `Promise` API.
deleteKelas(deleteKelasVars).then((response) => {
  const data = response.data;
  console.log(data.kelas_delete);
});
```

### Using `DeleteKelas`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteKelasRef, DeleteKelasVariables } from '@uassiakad/connector';

// The `DeleteKelas` mutation requires an argument of type `DeleteKelasVariables`:
const deleteKelasVars: DeleteKelasVariables = {
  id: ..., 
};

// Call the `deleteKelasRef()` function to get a reference to the mutation.
const ref = deleteKelasRef(deleteKelasVars);
// Variables can be defined inline as well.
const ref = deleteKelasRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteKelasRef(dataConnect, deleteKelasVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.kelas_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.kelas_delete);
});
```

## CreateJurusan
You can execute the `CreateJurusan` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createJurusan(vars: CreateJurusanVariables): MutationPromise<CreateJurusanData, CreateJurusanVariables>;

interface CreateJurusanRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateJurusanVariables): MutationRef<CreateJurusanData, CreateJurusanVariables>;
}
export const createJurusanRef: CreateJurusanRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createJurusan(dc: DataConnect, vars: CreateJurusanVariables): MutationPromise<CreateJurusanData, CreateJurusanVariables>;

interface CreateJurusanRef {
  ...
  (dc: DataConnect, vars: CreateJurusanVariables): MutationRef<CreateJurusanData, CreateJurusanVariables>;
}
export const createJurusanRef: CreateJurusanRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createJurusanRef:
```typescript
const name = createJurusanRef.operationName;
console.log(name);
```

### Variables
The `CreateJurusan` mutation requires an argument of type `CreateJurusanVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateJurusanVariables {
  kode: string;
  nama: string;
}
```
### Return Type
Recall that executing the `CreateJurusan` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateJurusanData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateJurusanData {
  jurusan_insert: Jurusan_Key;
}
```
### Using `CreateJurusan`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createJurusan, CreateJurusanVariables } from '@uassiakad/connector';

// The `CreateJurusan` mutation requires an argument of type `CreateJurusanVariables`:
const createJurusanVars: CreateJurusanVariables = {
  kode: ..., 
  nama: ..., 
};

// Call the `createJurusan()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createJurusan(createJurusanVars);
// Variables can be defined inline as well.
const { data } = await createJurusan({ kode: ..., nama: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createJurusan(dataConnect, createJurusanVars);

console.log(data.jurusan_insert);

// Or, you can use the `Promise` API.
createJurusan(createJurusanVars).then((response) => {
  const data = response.data;
  console.log(data.jurusan_insert);
});
```

### Using `CreateJurusan`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createJurusanRef, CreateJurusanVariables } from '@uassiakad/connector';

// The `CreateJurusan` mutation requires an argument of type `CreateJurusanVariables`:
const createJurusanVars: CreateJurusanVariables = {
  kode: ..., 
  nama: ..., 
};

// Call the `createJurusanRef()` function to get a reference to the mutation.
const ref = createJurusanRef(createJurusanVars);
// Variables can be defined inline as well.
const ref = createJurusanRef({ kode: ..., nama: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createJurusanRef(dataConnect, createJurusanVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.jurusan_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.jurusan_insert);
});
```

## UpdateJurusan
You can execute the `UpdateJurusan` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateJurusan(vars: UpdateJurusanVariables): MutationPromise<UpdateJurusanData, UpdateJurusanVariables>;

interface UpdateJurusanRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateJurusanVariables): MutationRef<UpdateJurusanData, UpdateJurusanVariables>;
}
export const updateJurusanRef: UpdateJurusanRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateJurusan(dc: DataConnect, vars: UpdateJurusanVariables): MutationPromise<UpdateJurusanData, UpdateJurusanVariables>;

interface UpdateJurusanRef {
  ...
  (dc: DataConnect, vars: UpdateJurusanVariables): MutationRef<UpdateJurusanData, UpdateJurusanVariables>;
}
export const updateJurusanRef: UpdateJurusanRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateJurusanRef:
```typescript
const name = updateJurusanRef.operationName;
console.log(name);
```

### Variables
The `UpdateJurusan` mutation requires an argument of type `UpdateJurusanVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateJurusanVariables {
  id: UUIDString;
  kode?: string | null;
  nama?: string | null;
}
```
### Return Type
Recall that executing the `UpdateJurusan` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateJurusanData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateJurusanData {
  jurusan_update?: Jurusan_Key | null;
}
```
### Using `UpdateJurusan`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateJurusan, UpdateJurusanVariables } from '@uassiakad/connector';

// The `UpdateJurusan` mutation requires an argument of type `UpdateJurusanVariables`:
const updateJurusanVars: UpdateJurusanVariables = {
  id: ..., 
  kode: ..., // optional
  nama: ..., // optional
};

// Call the `updateJurusan()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateJurusan(updateJurusanVars);
// Variables can be defined inline as well.
const { data } = await updateJurusan({ id: ..., kode: ..., nama: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateJurusan(dataConnect, updateJurusanVars);

console.log(data.jurusan_update);

// Or, you can use the `Promise` API.
updateJurusan(updateJurusanVars).then((response) => {
  const data = response.data;
  console.log(data.jurusan_update);
});
```

### Using `UpdateJurusan`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateJurusanRef, UpdateJurusanVariables } from '@uassiakad/connector';

// The `UpdateJurusan` mutation requires an argument of type `UpdateJurusanVariables`:
const updateJurusanVars: UpdateJurusanVariables = {
  id: ..., 
  kode: ..., // optional
  nama: ..., // optional
};

// Call the `updateJurusanRef()` function to get a reference to the mutation.
const ref = updateJurusanRef(updateJurusanVars);
// Variables can be defined inline as well.
const ref = updateJurusanRef({ id: ..., kode: ..., nama: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateJurusanRef(dataConnect, updateJurusanVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.jurusan_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.jurusan_update);
});
```

## DeleteJurusan
You can execute the `DeleteJurusan` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deleteJurusan(vars: DeleteJurusanVariables): MutationPromise<DeleteJurusanData, DeleteJurusanVariables>;

interface DeleteJurusanRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteJurusanVariables): MutationRef<DeleteJurusanData, DeleteJurusanVariables>;
}
export const deleteJurusanRef: DeleteJurusanRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteJurusan(dc: DataConnect, vars: DeleteJurusanVariables): MutationPromise<DeleteJurusanData, DeleteJurusanVariables>;

interface DeleteJurusanRef {
  ...
  (dc: DataConnect, vars: DeleteJurusanVariables): MutationRef<DeleteJurusanData, DeleteJurusanVariables>;
}
export const deleteJurusanRef: DeleteJurusanRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteJurusanRef:
```typescript
const name = deleteJurusanRef.operationName;
console.log(name);
```

### Variables
The `DeleteJurusan` mutation requires an argument of type `DeleteJurusanVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteJurusanVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteJurusan` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteJurusanData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteJurusanData {
  jurusan_delete?: Jurusan_Key | null;
}
```
### Using `DeleteJurusan`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteJurusan, DeleteJurusanVariables } from '@uassiakad/connector';

// The `DeleteJurusan` mutation requires an argument of type `DeleteJurusanVariables`:
const deleteJurusanVars: DeleteJurusanVariables = {
  id: ..., 
};

// Call the `deleteJurusan()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteJurusan(deleteJurusanVars);
// Variables can be defined inline as well.
const { data } = await deleteJurusan({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteJurusan(dataConnect, deleteJurusanVars);

console.log(data.jurusan_delete);

// Or, you can use the `Promise` API.
deleteJurusan(deleteJurusanVars).then((response) => {
  const data = response.data;
  console.log(data.jurusan_delete);
});
```

### Using `DeleteJurusan`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteJurusanRef, DeleteJurusanVariables } from '@uassiakad/connector';

// The `DeleteJurusan` mutation requires an argument of type `DeleteJurusanVariables`:
const deleteJurusanVars: DeleteJurusanVariables = {
  id: ..., 
};

// Call the `deleteJurusanRef()` function to get a reference to the mutation.
const ref = deleteJurusanRef(deleteJurusanVars);
// Variables can be defined inline as well.
const ref = deleteJurusanRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteJurusanRef(dataConnect, deleteJurusanVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.jurusan_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.jurusan_delete);
});
```

## CreateMataPelajaran
You can execute the `CreateMataPelajaran` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createMataPelajaran(vars: CreateMataPelajaranVariables): MutationPromise<CreateMataPelajaranData, CreateMataPelajaranVariables>;

interface CreateMataPelajaranRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMataPelajaranVariables): MutationRef<CreateMataPelajaranData, CreateMataPelajaranVariables>;
}
export const createMataPelajaranRef: CreateMataPelajaranRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMataPelajaran(dc: DataConnect, vars: CreateMataPelajaranVariables): MutationPromise<CreateMataPelajaranData, CreateMataPelajaranVariables>;

interface CreateMataPelajaranRef {
  ...
  (dc: DataConnect, vars: CreateMataPelajaranVariables): MutationRef<CreateMataPelajaranData, CreateMataPelajaranVariables>;
}
export const createMataPelajaranRef: CreateMataPelajaranRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMataPelajaranRef:
```typescript
const name = createMataPelajaranRef.operationName;
console.log(name);
```

### Variables
The `CreateMataPelajaran` mutation requires an argument of type `CreateMataPelajaranVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMataPelajaranVariables {
  kode: string;
  nama: string;
}
```
### Return Type
Recall that executing the `CreateMataPelajaran` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMataPelajaranData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMataPelajaranData {
  mataPelajaran_insert: MataPelajaran_Key;
}
```
### Using `CreateMataPelajaran`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMataPelajaran, CreateMataPelajaranVariables } from '@uassiakad/connector';

// The `CreateMataPelajaran` mutation requires an argument of type `CreateMataPelajaranVariables`:
const createMataPelajaranVars: CreateMataPelajaranVariables = {
  kode: ..., 
  nama: ..., 
};

// Call the `createMataPelajaran()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMataPelajaran(createMataPelajaranVars);
// Variables can be defined inline as well.
const { data } = await createMataPelajaran({ kode: ..., nama: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMataPelajaran(dataConnect, createMataPelajaranVars);

console.log(data.mataPelajaran_insert);

// Or, you can use the `Promise` API.
createMataPelajaran(createMataPelajaranVars).then((response) => {
  const data = response.data;
  console.log(data.mataPelajaran_insert);
});
```

### Using `CreateMataPelajaran`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMataPelajaranRef, CreateMataPelajaranVariables } from '@uassiakad/connector';

// The `CreateMataPelajaran` mutation requires an argument of type `CreateMataPelajaranVariables`:
const createMataPelajaranVars: CreateMataPelajaranVariables = {
  kode: ..., 
  nama: ..., 
};

// Call the `createMataPelajaranRef()` function to get a reference to the mutation.
const ref = createMataPelajaranRef(createMataPelajaranVars);
// Variables can be defined inline as well.
const ref = createMataPelajaranRef({ kode: ..., nama: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMataPelajaranRef(dataConnect, createMataPelajaranVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.mataPelajaran_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.mataPelajaran_insert);
});
```

## UpdateMataPelajaran
You can execute the `UpdateMataPelajaran` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateMataPelajaran(vars: UpdateMataPelajaranVariables): MutationPromise<UpdateMataPelajaranData, UpdateMataPelajaranVariables>;

interface UpdateMataPelajaranRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMataPelajaranVariables): MutationRef<UpdateMataPelajaranData, UpdateMataPelajaranVariables>;
}
export const updateMataPelajaranRef: UpdateMataPelajaranRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMataPelajaran(dc: DataConnect, vars: UpdateMataPelajaranVariables): MutationPromise<UpdateMataPelajaranData, UpdateMataPelajaranVariables>;

interface UpdateMataPelajaranRef {
  ...
  (dc: DataConnect, vars: UpdateMataPelajaranVariables): MutationRef<UpdateMataPelajaranData, UpdateMataPelajaranVariables>;
}
export const updateMataPelajaranRef: UpdateMataPelajaranRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMataPelajaranRef:
```typescript
const name = updateMataPelajaranRef.operationName;
console.log(name);
```

### Variables
The `UpdateMataPelajaran` mutation requires an argument of type `UpdateMataPelajaranVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMataPelajaranVariables {
  id: UUIDString;
  kode?: string | null;
  nama?: string | null;
}
```
### Return Type
Recall that executing the `UpdateMataPelajaran` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMataPelajaranData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMataPelajaranData {
  mataPelajaran_update?: MataPelajaran_Key | null;
}
```
### Using `UpdateMataPelajaran`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMataPelajaran, UpdateMataPelajaranVariables } from '@uassiakad/connector';

// The `UpdateMataPelajaran` mutation requires an argument of type `UpdateMataPelajaranVariables`:
const updateMataPelajaranVars: UpdateMataPelajaranVariables = {
  id: ..., 
  kode: ..., // optional
  nama: ..., // optional
};

// Call the `updateMataPelajaran()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMataPelajaran(updateMataPelajaranVars);
// Variables can be defined inline as well.
const { data } = await updateMataPelajaran({ id: ..., kode: ..., nama: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMataPelajaran(dataConnect, updateMataPelajaranVars);

console.log(data.mataPelajaran_update);

// Or, you can use the `Promise` API.
updateMataPelajaran(updateMataPelajaranVars).then((response) => {
  const data = response.data;
  console.log(data.mataPelajaran_update);
});
```

### Using `UpdateMataPelajaran`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMataPelajaranRef, UpdateMataPelajaranVariables } from '@uassiakad/connector';

// The `UpdateMataPelajaran` mutation requires an argument of type `UpdateMataPelajaranVariables`:
const updateMataPelajaranVars: UpdateMataPelajaranVariables = {
  id: ..., 
  kode: ..., // optional
  nama: ..., // optional
};

// Call the `updateMataPelajaranRef()` function to get a reference to the mutation.
const ref = updateMataPelajaranRef(updateMataPelajaranVars);
// Variables can be defined inline as well.
const ref = updateMataPelajaranRef({ id: ..., kode: ..., nama: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMataPelajaranRef(dataConnect, updateMataPelajaranVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.mataPelajaran_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.mataPelajaran_update);
});
```

## DeleteMataPelajaran
You can execute the `DeleteMataPelajaran` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deleteMataPelajaran(vars: DeleteMataPelajaranVariables): MutationPromise<DeleteMataPelajaranData, DeleteMataPelajaranVariables>;

interface DeleteMataPelajaranRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMataPelajaranVariables): MutationRef<DeleteMataPelajaranData, DeleteMataPelajaranVariables>;
}
export const deleteMataPelajaranRef: DeleteMataPelajaranRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMataPelajaran(dc: DataConnect, vars: DeleteMataPelajaranVariables): MutationPromise<DeleteMataPelajaranData, DeleteMataPelajaranVariables>;

interface DeleteMataPelajaranRef {
  ...
  (dc: DataConnect, vars: DeleteMataPelajaranVariables): MutationRef<DeleteMataPelajaranData, DeleteMataPelajaranVariables>;
}
export const deleteMataPelajaranRef: DeleteMataPelajaranRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMataPelajaranRef:
```typescript
const name = deleteMataPelajaranRef.operationName;
console.log(name);
```

### Variables
The `DeleteMataPelajaran` mutation requires an argument of type `DeleteMataPelajaranVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMataPelajaranVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMataPelajaran` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMataPelajaranData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMataPelajaranData {
  mataPelajaran_delete?: MataPelajaran_Key | null;
}
```
### Using `DeleteMataPelajaran`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMataPelajaran, DeleteMataPelajaranVariables } from '@uassiakad/connector';

// The `DeleteMataPelajaran` mutation requires an argument of type `DeleteMataPelajaranVariables`:
const deleteMataPelajaranVars: DeleteMataPelajaranVariables = {
  id: ..., 
};

// Call the `deleteMataPelajaran()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMataPelajaran(deleteMataPelajaranVars);
// Variables can be defined inline as well.
const { data } = await deleteMataPelajaran({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMataPelajaran(dataConnect, deleteMataPelajaranVars);

console.log(data.mataPelajaran_delete);

// Or, you can use the `Promise` API.
deleteMataPelajaran(deleteMataPelajaranVars).then((response) => {
  const data = response.data;
  console.log(data.mataPelajaran_delete);
});
```

### Using `DeleteMataPelajaran`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMataPelajaranRef, DeleteMataPelajaranVariables } from '@uassiakad/connector';

// The `DeleteMataPelajaran` mutation requires an argument of type `DeleteMataPelajaranVariables`:
const deleteMataPelajaranVars: DeleteMataPelajaranVariables = {
  id: ..., 
};

// Call the `deleteMataPelajaranRef()` function to get a reference to the mutation.
const ref = deleteMataPelajaranRef(deleteMataPelajaranVars);
// Variables can be defined inline as well.
const ref = deleteMataPelajaranRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMataPelajaranRef(dataConnect, deleteMataPelajaranVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.mataPelajaran_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.mataPelajaran_delete);
});
```

## CreateJadwal
You can execute the `CreateJadwal` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createJadwal(vars: CreateJadwalVariables): MutationPromise<CreateJadwalData, CreateJadwalVariables>;

interface CreateJadwalRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateJadwalVariables): MutationRef<CreateJadwalData, CreateJadwalVariables>;
}
export const createJadwalRef: CreateJadwalRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createJadwal(dc: DataConnect, vars: CreateJadwalVariables): MutationPromise<CreateJadwalData, CreateJadwalVariables>;

interface CreateJadwalRef {
  ...
  (dc: DataConnect, vars: CreateJadwalVariables): MutationRef<CreateJadwalData, CreateJadwalVariables>;
}
export const createJadwalRef: CreateJadwalRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createJadwalRef:
```typescript
const name = createJadwalRef.operationName;
console.log(name);
```

### Variables
The `CreateJadwal` mutation requires an argument of type `CreateJadwalVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateJadwalVariables {
  kelasId: UUIDString;
  mataPelajaranId: UUIDString;
  guruId: UUIDString;
  jamMulai: string;
  jamSelesai: string;
  hari: string;
  ruangan?: string | null;
  tahunAjaran: string;
  semester: string;
}
```
### Return Type
Recall that executing the `CreateJadwal` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateJadwalData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateJadwalData {
  jadwal_insert: Jadwal_Key;
}
```
### Using `CreateJadwal`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createJadwal, CreateJadwalVariables } from '@uassiakad/connector';

// The `CreateJadwal` mutation requires an argument of type `CreateJadwalVariables`:
const createJadwalVars: CreateJadwalVariables = {
  kelasId: ..., 
  mataPelajaranId: ..., 
  guruId: ..., 
  jamMulai: ..., 
  jamSelesai: ..., 
  hari: ..., 
  ruangan: ..., // optional
  tahunAjaran: ..., 
  semester: ..., 
};

// Call the `createJadwal()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createJadwal(createJadwalVars);
// Variables can be defined inline as well.
const { data } = await createJadwal({ kelasId: ..., mataPelajaranId: ..., guruId: ..., jamMulai: ..., jamSelesai: ..., hari: ..., ruangan: ..., tahunAjaran: ..., semester: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createJadwal(dataConnect, createJadwalVars);

console.log(data.jadwal_insert);

// Or, you can use the `Promise` API.
createJadwal(createJadwalVars).then((response) => {
  const data = response.data;
  console.log(data.jadwal_insert);
});
```

### Using `CreateJadwal`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createJadwalRef, CreateJadwalVariables } from '@uassiakad/connector';

// The `CreateJadwal` mutation requires an argument of type `CreateJadwalVariables`:
const createJadwalVars: CreateJadwalVariables = {
  kelasId: ..., 
  mataPelajaranId: ..., 
  guruId: ..., 
  jamMulai: ..., 
  jamSelesai: ..., 
  hari: ..., 
  ruangan: ..., // optional
  tahunAjaran: ..., 
  semester: ..., 
};

// Call the `createJadwalRef()` function to get a reference to the mutation.
const ref = createJadwalRef(createJadwalVars);
// Variables can be defined inline as well.
const ref = createJadwalRef({ kelasId: ..., mataPelajaranId: ..., guruId: ..., jamMulai: ..., jamSelesai: ..., hari: ..., ruangan: ..., tahunAjaran: ..., semester: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createJadwalRef(dataConnect, createJadwalVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.jadwal_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.jadwal_insert);
});
```

## DeleteJadwal
You can execute the `DeleteJadwal` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deleteJadwal(vars: DeleteJadwalVariables): MutationPromise<DeleteJadwalData, DeleteJadwalVariables>;

interface DeleteJadwalRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteJadwalVariables): MutationRef<DeleteJadwalData, DeleteJadwalVariables>;
}
export const deleteJadwalRef: DeleteJadwalRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteJadwal(dc: DataConnect, vars: DeleteJadwalVariables): MutationPromise<DeleteJadwalData, DeleteJadwalVariables>;

interface DeleteJadwalRef {
  ...
  (dc: DataConnect, vars: DeleteJadwalVariables): MutationRef<DeleteJadwalData, DeleteJadwalVariables>;
}
export const deleteJadwalRef: DeleteJadwalRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteJadwalRef:
```typescript
const name = deleteJadwalRef.operationName;
console.log(name);
```

### Variables
The `DeleteJadwal` mutation requires an argument of type `DeleteJadwalVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteJadwalVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteJadwal` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteJadwalData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteJadwalData {
  jadwal_delete?: Jadwal_Key | null;
}
```
### Using `DeleteJadwal`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteJadwal, DeleteJadwalVariables } from '@uassiakad/connector';

// The `DeleteJadwal` mutation requires an argument of type `DeleteJadwalVariables`:
const deleteJadwalVars: DeleteJadwalVariables = {
  id: ..., 
};

// Call the `deleteJadwal()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteJadwal(deleteJadwalVars);
// Variables can be defined inline as well.
const { data } = await deleteJadwal({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteJadwal(dataConnect, deleteJadwalVars);

console.log(data.jadwal_delete);

// Or, you can use the `Promise` API.
deleteJadwal(deleteJadwalVars).then((response) => {
  const data = response.data;
  console.log(data.jadwal_delete);
});
```

### Using `DeleteJadwal`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteJadwalRef, DeleteJadwalVariables } from '@uassiakad/connector';

// The `DeleteJadwal` mutation requires an argument of type `DeleteJadwalVariables`:
const deleteJadwalVars: DeleteJadwalVariables = {
  id: ..., 
};

// Call the `deleteJadwalRef()` function to get a reference to the mutation.
const ref = deleteJadwalRef(deleteJadwalVars);
// Variables can be defined inline as well.
const ref = deleteJadwalRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteJadwalRef(dataConnect, deleteJadwalVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.jadwal_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.jadwal_delete);
});
```

## UpsertNilai
You can execute the `UpsertNilai` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
upsertNilai(vars: UpsertNilaiVariables): MutationPromise<UpsertNilaiData, UpsertNilaiVariables>;

interface UpsertNilaiRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertNilaiVariables): MutationRef<UpsertNilaiData, UpsertNilaiVariables>;
}
export const upsertNilaiRef: UpsertNilaiRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertNilai(dc: DataConnect, vars: UpsertNilaiVariables): MutationPromise<UpsertNilaiData, UpsertNilaiVariables>;

interface UpsertNilaiRef {
  ...
  (dc: DataConnect, vars: UpsertNilaiVariables): MutationRef<UpsertNilaiData, UpsertNilaiVariables>;
}
export const upsertNilaiRef: UpsertNilaiRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertNilaiRef:
```typescript
const name = upsertNilaiRef.operationName;
console.log(name);
```

### Variables
The `UpsertNilai` mutation requires an argument of type `UpsertNilaiVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertNilaiVariables {
  siswaId: UUIDString;
  kelasId: UUIDString;
  mataPelajaranId: UUIDString;
  semester: string;
  tahunAjaran: string;
  nilaiHarian?: number | null;
  nilaiUts?: number | null;
  nilaiUas?: number | null;
}
```
### Return Type
Recall that executing the `UpsertNilai` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertNilaiData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertNilaiData {
  nilai_insert: Nilai_Key;
}
```
### Using `UpsertNilai`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertNilai, UpsertNilaiVariables } from '@uassiakad/connector';

// The `UpsertNilai` mutation requires an argument of type `UpsertNilaiVariables`:
const upsertNilaiVars: UpsertNilaiVariables = {
  siswaId: ..., 
  kelasId: ..., 
  mataPelajaranId: ..., 
  semester: ..., 
  tahunAjaran: ..., 
  nilaiHarian: ..., // optional
  nilaiUts: ..., // optional
  nilaiUas: ..., // optional
};

// Call the `upsertNilai()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertNilai(upsertNilaiVars);
// Variables can be defined inline as well.
const { data } = await upsertNilai({ siswaId: ..., kelasId: ..., mataPelajaranId: ..., semester: ..., tahunAjaran: ..., nilaiHarian: ..., nilaiUts: ..., nilaiUas: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertNilai(dataConnect, upsertNilaiVars);

console.log(data.nilai_insert);

// Or, you can use the `Promise` API.
upsertNilai(upsertNilaiVars).then((response) => {
  const data = response.data;
  console.log(data.nilai_insert);
});
```

### Using `UpsertNilai`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertNilaiRef, UpsertNilaiVariables } from '@uassiakad/connector';

// The `UpsertNilai` mutation requires an argument of type `UpsertNilaiVariables`:
const upsertNilaiVars: UpsertNilaiVariables = {
  siswaId: ..., 
  kelasId: ..., 
  mataPelajaranId: ..., 
  semester: ..., 
  tahunAjaran: ..., 
  nilaiHarian: ..., // optional
  nilaiUts: ..., // optional
  nilaiUas: ..., // optional
};

// Call the `upsertNilaiRef()` function to get a reference to the mutation.
const ref = upsertNilaiRef(upsertNilaiVars);
// Variables can be defined inline as well.
const ref = upsertNilaiRef({ siswaId: ..., kelasId: ..., mataPelajaranId: ..., semester: ..., tahunAjaran: ..., nilaiHarian: ..., nilaiUts: ..., nilaiUas: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertNilaiRef(dataConnect, upsertNilaiVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.nilai_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.nilai_insert);
});
```

## RecordKehadiran
You can execute the `RecordKehadiran` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
recordKehadiran(vars: RecordKehadiranVariables): MutationPromise<RecordKehadiranData, RecordKehadiranVariables>;

interface RecordKehadiranRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordKehadiranVariables): MutationRef<RecordKehadiranData, RecordKehadiranVariables>;
}
export const recordKehadiranRef: RecordKehadiranRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordKehadiran(dc: DataConnect, vars: RecordKehadiranVariables): MutationPromise<RecordKehadiranData, RecordKehadiranVariables>;

interface RecordKehadiranRef {
  ...
  (dc: DataConnect, vars: RecordKehadiranVariables): MutationRef<RecordKehadiranData, RecordKehadiranVariables>;
}
export const recordKehadiranRef: RecordKehadiranRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordKehadiranRef:
```typescript
const name = recordKehadiranRef.operationName;
console.log(name);
```

### Variables
The `RecordKehadiran` mutation requires an argument of type `RecordKehadiranVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordKehadiranVariables {
  siswaId: UUIDString;
  kelasId: UUIDString;
  tanggal: DateString;
  status: StatusKehadiran;
  catatan?: string | null;
}
```
### Return Type
Recall that executing the `RecordKehadiran` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordKehadiranData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordKehadiranData {
  kehadiran_insert: Kehadiran_Key;
}
```
### Using `RecordKehadiran`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordKehadiran, RecordKehadiranVariables } from '@uassiakad/connector';

// The `RecordKehadiran` mutation requires an argument of type `RecordKehadiranVariables`:
const recordKehadiranVars: RecordKehadiranVariables = {
  siswaId: ..., 
  kelasId: ..., 
  tanggal: ..., 
  status: ..., 
  catatan: ..., // optional
};

// Call the `recordKehadiran()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordKehadiran(recordKehadiranVars);
// Variables can be defined inline as well.
const { data } = await recordKehadiran({ siswaId: ..., kelasId: ..., tanggal: ..., status: ..., catatan: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordKehadiran(dataConnect, recordKehadiranVars);

console.log(data.kehadiran_insert);

// Or, you can use the `Promise` API.
recordKehadiran(recordKehadiranVars).then((response) => {
  const data = response.data;
  console.log(data.kehadiran_insert);
});
```

### Using `RecordKehadiran`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordKehadiranRef, RecordKehadiranVariables } from '@uassiakad/connector';

// The `RecordKehadiran` mutation requires an argument of type `RecordKehadiranVariables`:
const recordKehadiranVars: RecordKehadiranVariables = {
  siswaId: ..., 
  kelasId: ..., 
  tanggal: ..., 
  status: ..., 
  catatan: ..., // optional
};

// Call the `recordKehadiranRef()` function to get a reference to the mutation.
const ref = recordKehadiranRef(recordKehadiranVars);
// Variables can be defined inline as well.
const ref = recordKehadiranRef({ siswaId: ..., kelasId: ..., tanggal: ..., status: ..., catatan: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordKehadiranRef(dataConnect, recordKehadiranVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.kehadiran_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.kehadiran_insert);
});
```

## CreatePengumuman
You can execute the `CreatePengumuman` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createPengumuman(vars: CreatePengumumanVariables): MutationPromise<CreatePengumumanData, CreatePengumumanVariables>;

interface CreatePengumumanRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePengumumanVariables): MutationRef<CreatePengumumanData, CreatePengumumanVariables>;
}
export const createPengumumanRef: CreatePengumumanRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPengumuman(dc: DataConnect, vars: CreatePengumumanVariables): MutationPromise<CreatePengumumanData, CreatePengumumanVariables>;

interface CreatePengumumanRef {
  ...
  (dc: DataConnect, vars: CreatePengumumanVariables): MutationRef<CreatePengumumanData, CreatePengumumanVariables>;
}
export const createPengumumanRef: CreatePengumumanRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPengumumanRef:
```typescript
const name = createPengumumanRef.operationName;
console.log(name);
```

### Variables
The `CreatePengumuman` mutation requires an argument of type `CreatePengumumanVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePengumumanVariables {
  judul: string;
  konten: string;
  penulisId: UUIDString;
  isPenting?: boolean | null;
}
```
### Return Type
Recall that executing the `CreatePengumuman` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePengumumanData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePengumumanData {
  pengumuman_insert: Pengumuman_Key;
}
```
### Using `CreatePengumuman`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPengumuman, CreatePengumumanVariables } from '@uassiakad/connector';

// The `CreatePengumuman` mutation requires an argument of type `CreatePengumumanVariables`:
const createPengumumanVars: CreatePengumumanVariables = {
  judul: ..., 
  konten: ..., 
  penulisId: ..., 
  isPenting: ..., // optional
};

// Call the `createPengumuman()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPengumuman(createPengumumanVars);
// Variables can be defined inline as well.
const { data } = await createPengumuman({ judul: ..., konten: ..., penulisId: ..., isPenting: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPengumuman(dataConnect, createPengumumanVars);

console.log(data.pengumuman_insert);

// Or, you can use the `Promise` API.
createPengumuman(createPengumumanVars).then((response) => {
  const data = response.data;
  console.log(data.pengumuman_insert);
});
```

### Using `CreatePengumuman`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPengumumanRef, CreatePengumumanVariables } from '@uassiakad/connector';

// The `CreatePengumuman` mutation requires an argument of type `CreatePengumumanVariables`:
const createPengumumanVars: CreatePengumumanVariables = {
  judul: ..., 
  konten: ..., 
  penulisId: ..., 
  isPenting: ..., // optional
};

// Call the `createPengumumanRef()` function to get a reference to the mutation.
const ref = createPengumumanRef(createPengumumanVars);
// Variables can be defined inline as well.
const ref = createPengumumanRef({ judul: ..., konten: ..., penulisId: ..., isPenting: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPengumumanRef(dataConnect, createPengumumanVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.pengumuman_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.pengumuman_insert);
});
```

## DeletePengumuman
You can execute the `DeletePengumuman` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deletePengumuman(vars: DeletePengumumanVariables): MutationPromise<DeletePengumumanData, DeletePengumumanVariables>;

interface DeletePengumumanRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePengumumanVariables): MutationRef<DeletePengumumanData, DeletePengumumanVariables>;
}
export const deletePengumumanRef: DeletePengumumanRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePengumuman(dc: DataConnect, vars: DeletePengumumanVariables): MutationPromise<DeletePengumumanData, DeletePengumumanVariables>;

interface DeletePengumumanRef {
  ...
  (dc: DataConnect, vars: DeletePengumumanVariables): MutationRef<DeletePengumumanData, DeletePengumumanVariables>;
}
export const deletePengumumanRef: DeletePengumumanRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePengumumanRef:
```typescript
const name = deletePengumumanRef.operationName;
console.log(name);
```

### Variables
The `DeletePengumuman` mutation requires an argument of type `DeletePengumumanVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePengumumanVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeletePengumuman` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePengumumanData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePengumumanData {
  pengumuman_delete?: Pengumuman_Key | null;
}
```
### Using `DeletePengumuman`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePengumuman, DeletePengumumanVariables } from '@uassiakad/connector';

// The `DeletePengumuman` mutation requires an argument of type `DeletePengumumanVariables`:
const deletePengumumanVars: DeletePengumumanVariables = {
  id: ..., 
};

// Call the `deletePengumuman()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePengumuman(deletePengumumanVars);
// Variables can be defined inline as well.
const { data } = await deletePengumuman({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePengumuman(dataConnect, deletePengumumanVars);

console.log(data.pengumuman_delete);

// Or, you can use the `Promise` API.
deletePengumuman(deletePengumumanVars).then((response) => {
  const data = response.data;
  console.log(data.pengumuman_delete);
});
```

### Using `DeletePengumuman`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePengumumanRef, DeletePengumumanVariables } from '@uassiakad/connector';

// The `DeletePengumuman` mutation requires an argument of type `DeletePengumumanVariables`:
const deletePengumumanVars: DeletePengumumanVariables = {
  id: ..., 
};

// Call the `deletePengumumanRef()` function to get a reference to the mutation.
const ref = deletePengumumanRef(deletePengumumanVars);
// Variables can be defined inline as well.
const ref = deletePengumumanRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePengumumanRef(dataConnect, deletePengumumanVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.pengumuman_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.pengumuman_delete);
});
```

## CreatePrestasi
You can execute the `CreatePrestasi` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createPrestasi(vars: CreatePrestasiVariables): MutationPromise<CreatePrestasiData, CreatePrestasiVariables>;

interface CreatePrestasiRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePrestasiVariables): MutationRef<CreatePrestasiData, CreatePrestasiVariables>;
}
export const createPrestasiRef: CreatePrestasiRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPrestasi(dc: DataConnect, vars: CreatePrestasiVariables): MutationPromise<CreatePrestasiData, CreatePrestasiVariables>;

interface CreatePrestasiRef {
  ...
  (dc: DataConnect, vars: CreatePrestasiVariables): MutationRef<CreatePrestasiData, CreatePrestasiVariables>;
}
export const createPrestasiRef: CreatePrestasiRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPrestasiRef:
```typescript
const name = createPrestasiRef.operationName;
console.log(name);
```

### Variables
The `CreatePrestasi` mutation requires an argument of type `CreatePrestasiVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePrestasiVariables {
  siswaId: UUIDString;
  nama: string;
  tipe: TipePrestasi;
  tingkat: string;
  peringkat: string;
  tanggal: DateString;
  deskripsi?: string | null;
}
```
### Return Type
Recall that executing the `CreatePrestasi` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePrestasiData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePrestasiData {
  prestasi_insert: Prestasi_Key;
}
```
### Using `CreatePrestasi`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPrestasi, CreatePrestasiVariables } from '@uassiakad/connector';

// The `CreatePrestasi` mutation requires an argument of type `CreatePrestasiVariables`:
const createPrestasiVars: CreatePrestasiVariables = {
  siswaId: ..., 
  nama: ..., 
  tipe: ..., 
  tingkat: ..., 
  peringkat: ..., 
  tanggal: ..., 
  deskripsi: ..., // optional
};

// Call the `createPrestasi()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPrestasi(createPrestasiVars);
// Variables can be defined inline as well.
const { data } = await createPrestasi({ siswaId: ..., nama: ..., tipe: ..., tingkat: ..., peringkat: ..., tanggal: ..., deskripsi: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPrestasi(dataConnect, createPrestasiVars);

console.log(data.prestasi_insert);

// Or, you can use the `Promise` API.
createPrestasi(createPrestasiVars).then((response) => {
  const data = response.data;
  console.log(data.prestasi_insert);
});
```

### Using `CreatePrestasi`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPrestasiRef, CreatePrestasiVariables } from '@uassiakad/connector';

// The `CreatePrestasi` mutation requires an argument of type `CreatePrestasiVariables`:
const createPrestasiVars: CreatePrestasiVariables = {
  siswaId: ..., 
  nama: ..., 
  tipe: ..., 
  tingkat: ..., 
  peringkat: ..., 
  tanggal: ..., 
  deskripsi: ..., // optional
};

// Call the `createPrestasiRef()` function to get a reference to the mutation.
const ref = createPrestasiRef(createPrestasiVars);
// Variables can be defined inline as well.
const ref = createPrestasiRef({ siswaId: ..., nama: ..., tipe: ..., tingkat: ..., peringkat: ..., tanggal: ..., deskripsi: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPrestasiRef(dataConnect, createPrestasiVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.prestasi_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.prestasi_insert);
});
```

## DeletePrestasi
You can execute the `DeletePrestasi` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deletePrestasi(vars: DeletePrestasiVariables): MutationPromise<DeletePrestasiData, DeletePrestasiVariables>;

interface DeletePrestasiRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePrestasiVariables): MutationRef<DeletePrestasiData, DeletePrestasiVariables>;
}
export const deletePrestasiRef: DeletePrestasiRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePrestasi(dc: DataConnect, vars: DeletePrestasiVariables): MutationPromise<DeletePrestasiData, DeletePrestasiVariables>;

interface DeletePrestasiRef {
  ...
  (dc: DataConnect, vars: DeletePrestasiVariables): MutationRef<DeletePrestasiData, DeletePrestasiVariables>;
}
export const deletePrestasiRef: DeletePrestasiRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePrestasiRef:
```typescript
const name = deletePrestasiRef.operationName;
console.log(name);
```

### Variables
The `DeletePrestasi` mutation requires an argument of type `DeletePrestasiVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePrestasiVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeletePrestasi` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePrestasiData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePrestasiData {
  prestasi_delete?: Prestasi_Key | null;
}
```
### Using `DeletePrestasi`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePrestasi, DeletePrestasiVariables } from '@uassiakad/connector';

// The `DeletePrestasi` mutation requires an argument of type `DeletePrestasiVariables`:
const deletePrestasiVars: DeletePrestasiVariables = {
  id: ..., 
};

// Call the `deletePrestasi()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePrestasi(deletePrestasiVars);
// Variables can be defined inline as well.
const { data } = await deletePrestasi({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePrestasi(dataConnect, deletePrestasiVars);

console.log(data.prestasi_delete);

// Or, you can use the `Promise` API.
deletePrestasi(deletePrestasiVars).then((response) => {
  const data = response.data;
  console.log(data.prestasi_delete);
});
```

### Using `DeletePrestasi`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePrestasiRef, DeletePrestasiVariables } from '@uassiakad/connector';

// The `DeletePrestasi` mutation requires an argument of type `DeletePrestasiVariables`:
const deletePrestasiVars: DeletePrestasiVariables = {
  id: ..., 
};

// Call the `deletePrestasiRef()` function to get a reference to the mutation.
const ref = deletePrestasiRef(deletePrestasiVars);
// Variables can be defined inline as well.
const ref = deletePrestasiRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePrestasiRef(dataConnect, deletePrestasiVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.prestasi_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.prestasi_delete);
});
```

## CreateAlumni
You can execute the `CreateAlumni` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createAlumni(vars: CreateAlumniVariables): MutationPromise<CreateAlumniData, CreateAlumniVariables>;

interface CreateAlumniRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAlumniVariables): MutationRef<CreateAlumniData, CreateAlumniVariables>;
}
export const createAlumniRef: CreateAlumniRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAlumni(dc: DataConnect, vars: CreateAlumniVariables): MutationPromise<CreateAlumniData, CreateAlumniVariables>;

interface CreateAlumniRef {
  ...
  (dc: DataConnect, vars: CreateAlumniVariables): MutationRef<CreateAlumniData, CreateAlumniVariables>;
}
export const createAlumniRef: CreateAlumniRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAlumniRef:
```typescript
const name = createAlumniRef.operationName;
console.log(name);
```

### Variables
The `CreateAlumni` mutation requires an argument of type `CreateAlumniVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAlumniVariables {
  nis: string;
  nama: string;
  tahunLulus: number;
  status: StatusAlumni;
  institusi?: string | null;
  jabatanAtauJurusan?: string | null;
  email?: string | null;
  telepon?: string | null;
  alamat?: string | null;
  prestasi?: string | null;
}
```
### Return Type
Recall that executing the `CreateAlumni` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAlumniData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAlumniData {
  alumni_insert: Alumni_Key;
}
```
### Using `CreateAlumni`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAlumni, CreateAlumniVariables } from '@uassiakad/connector';

// The `CreateAlumni` mutation requires an argument of type `CreateAlumniVariables`:
const createAlumniVars: CreateAlumniVariables = {
  nis: ..., 
  nama: ..., 
  tahunLulus: ..., 
  status: ..., 
  institusi: ..., // optional
  jabatanAtauJurusan: ..., // optional
  email: ..., // optional
  telepon: ..., // optional
  alamat: ..., // optional
  prestasi: ..., // optional
};

// Call the `createAlumni()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAlumni(createAlumniVars);
// Variables can be defined inline as well.
const { data } = await createAlumni({ nis: ..., nama: ..., tahunLulus: ..., status: ..., institusi: ..., jabatanAtauJurusan: ..., email: ..., telepon: ..., alamat: ..., prestasi: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAlumni(dataConnect, createAlumniVars);

console.log(data.alumni_insert);

// Or, you can use the `Promise` API.
createAlumni(createAlumniVars).then((response) => {
  const data = response.data;
  console.log(data.alumni_insert);
});
```

### Using `CreateAlumni`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAlumniRef, CreateAlumniVariables } from '@uassiakad/connector';

// The `CreateAlumni` mutation requires an argument of type `CreateAlumniVariables`:
const createAlumniVars: CreateAlumniVariables = {
  nis: ..., 
  nama: ..., 
  tahunLulus: ..., 
  status: ..., 
  institusi: ..., // optional
  jabatanAtauJurusan: ..., // optional
  email: ..., // optional
  telepon: ..., // optional
  alamat: ..., // optional
  prestasi: ..., // optional
};

// Call the `createAlumniRef()` function to get a reference to the mutation.
const ref = createAlumniRef(createAlumniVars);
// Variables can be defined inline as well.
const ref = createAlumniRef({ nis: ..., nama: ..., tahunLulus: ..., status: ..., institusi: ..., jabatanAtauJurusan: ..., email: ..., telepon: ..., alamat: ..., prestasi: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAlumniRef(dataConnect, createAlumniVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.alumni_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.alumni_insert);
});
```

## UpdateAlumni
You can execute the `UpdateAlumni` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateAlumni(vars: UpdateAlumniVariables): MutationPromise<UpdateAlumniData, UpdateAlumniVariables>;

interface UpdateAlumniRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAlumniVariables): MutationRef<UpdateAlumniData, UpdateAlumniVariables>;
}
export const updateAlumniRef: UpdateAlumniRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAlumni(dc: DataConnect, vars: UpdateAlumniVariables): MutationPromise<UpdateAlumniData, UpdateAlumniVariables>;

interface UpdateAlumniRef {
  ...
  (dc: DataConnect, vars: UpdateAlumniVariables): MutationRef<UpdateAlumniData, UpdateAlumniVariables>;
}
export const updateAlumniRef: UpdateAlumniRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAlumniRef:
```typescript
const name = updateAlumniRef.operationName;
console.log(name);
```

### Variables
The `UpdateAlumni` mutation requires an argument of type `UpdateAlumniVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAlumniVariables {
  id: UUIDString;
  status?: StatusAlumni | null;
  institusi?: string | null;
  jabatanAtauJurusan?: string | null;
  email?: string | null;
  telepon?: string | null;
  alamat?: string | null;
  prestasi?: string | null;
}
```
### Return Type
Recall that executing the `UpdateAlumni` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAlumniData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAlumniData {
  alumni_update?: Alumni_Key | null;
}
```
### Using `UpdateAlumni`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAlumni, UpdateAlumniVariables } from '@uassiakad/connector';

// The `UpdateAlumni` mutation requires an argument of type `UpdateAlumniVariables`:
const updateAlumniVars: UpdateAlumniVariables = {
  id: ..., 
  status: ..., // optional
  institusi: ..., // optional
  jabatanAtauJurusan: ..., // optional
  email: ..., // optional
  telepon: ..., // optional
  alamat: ..., // optional
  prestasi: ..., // optional
};

// Call the `updateAlumni()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAlumni(updateAlumniVars);
// Variables can be defined inline as well.
const { data } = await updateAlumni({ id: ..., status: ..., institusi: ..., jabatanAtauJurusan: ..., email: ..., telepon: ..., alamat: ..., prestasi: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAlumni(dataConnect, updateAlumniVars);

console.log(data.alumni_update);

// Or, you can use the `Promise` API.
updateAlumni(updateAlumniVars).then((response) => {
  const data = response.data;
  console.log(data.alumni_update);
});
```

### Using `UpdateAlumni`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAlumniRef, UpdateAlumniVariables } from '@uassiakad/connector';

// The `UpdateAlumni` mutation requires an argument of type `UpdateAlumniVariables`:
const updateAlumniVars: UpdateAlumniVariables = {
  id: ..., 
  status: ..., // optional
  institusi: ..., // optional
  jabatanAtauJurusan: ..., // optional
  email: ..., // optional
  telepon: ..., // optional
  alamat: ..., // optional
  prestasi: ..., // optional
};

// Call the `updateAlumniRef()` function to get a reference to the mutation.
const ref = updateAlumniRef(updateAlumniVars);
// Variables can be defined inline as well.
const ref = updateAlumniRef({ id: ..., status: ..., institusi: ..., jabatanAtauJurusan: ..., email: ..., telepon: ..., alamat: ..., prestasi: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAlumniRef(dataConnect, updateAlumniVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.alumni_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.alumni_update);
});
```

## DeleteAlumni
You can execute the `DeleteAlumni` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deleteAlumni(vars: DeleteAlumniVariables): MutationPromise<DeleteAlumniData, DeleteAlumniVariables>;

interface DeleteAlumniRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAlumniVariables): MutationRef<DeleteAlumniData, DeleteAlumniVariables>;
}
export const deleteAlumniRef: DeleteAlumniRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAlumni(dc: DataConnect, vars: DeleteAlumniVariables): MutationPromise<DeleteAlumniData, DeleteAlumniVariables>;

interface DeleteAlumniRef {
  ...
  (dc: DataConnect, vars: DeleteAlumniVariables): MutationRef<DeleteAlumniData, DeleteAlumniVariables>;
}
export const deleteAlumniRef: DeleteAlumniRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAlumniRef:
```typescript
const name = deleteAlumniRef.operationName;
console.log(name);
```

### Variables
The `DeleteAlumni` mutation requires an argument of type `DeleteAlumniVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAlumniVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAlumni` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAlumniData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAlumniData {
  alumni_delete?: Alumni_Key | null;
}
```
### Using `DeleteAlumni`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAlumni, DeleteAlumniVariables } from '@uassiakad/connector';

// The `DeleteAlumni` mutation requires an argument of type `DeleteAlumniVariables`:
const deleteAlumniVars: DeleteAlumniVariables = {
  id: ..., 
};

// Call the `deleteAlumni()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAlumni(deleteAlumniVars);
// Variables can be defined inline as well.
const { data } = await deleteAlumni({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAlumni(dataConnect, deleteAlumniVars);

console.log(data.alumni_delete);

// Or, you can use the `Promise` API.
deleteAlumni(deleteAlumniVars).then((response) => {
  const data = response.data;
  console.log(data.alumni_delete);
});
```

### Using `DeleteAlumni`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAlumniRef, DeleteAlumniVariables } from '@uassiakad/connector';

// The `DeleteAlumni` mutation requires an argument of type `DeleteAlumniVariables`:
const deleteAlumniVars: DeleteAlumniVariables = {
  id: ..., 
};

// Call the `deleteAlumniRef()` function to get a reference to the mutation.
const ref = deleteAlumniRef(deleteAlumniVars);
// Variables can be defined inline as well.
const ref = deleteAlumniRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAlumniRef(dataConnect, deleteAlumniVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.alumni_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.alumni_delete);
});
```

## ResetDatabase
You can execute the `ResetDatabase` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
resetDatabase(): MutationPromise<ResetDatabaseData, undefined>;

interface ResetDatabaseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<ResetDatabaseData, undefined>;
}
export const resetDatabaseRef: ResetDatabaseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
resetDatabase(dc: DataConnect): MutationPromise<ResetDatabaseData, undefined>;

interface ResetDatabaseRef {
  ...
  (dc: DataConnect): MutationRef<ResetDatabaseData, undefined>;
}
export const resetDatabaseRef: ResetDatabaseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the resetDatabaseRef:
```typescript
const name = resetDatabaseRef.operationName;
console.log(name);
```

### Variables
The `ResetDatabase` mutation has no variables.
### Return Type
Recall that executing the `ResetDatabase` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ResetDatabaseData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ResetDatabaseData {
  nilai_deleteMany: number;
  jadwal_deleteMany: number;
  prestasi_deleteMany: number;
  kehadiran_deleteMany: number;
  pengumuman_deleteMany: number;
  alumni_deleteMany: number;
  siswa_deleteMany: number;
  guru_deleteMany: number;
  kelas_deleteMany: number;
  jurusan_deleteMany: number;
  mataPelajaran_deleteMany: number;
  pengguna_deleteMany: number;
}
```
### Using `ResetDatabase`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, resetDatabase } from '@uassiakad/connector';


// Call the `resetDatabase()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await resetDatabase();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await resetDatabase(dataConnect);

console.log(data.nilai_deleteMany);
console.log(data.jadwal_deleteMany);
console.log(data.prestasi_deleteMany);
console.log(data.kehadiran_deleteMany);
console.log(data.pengumuman_deleteMany);
console.log(data.alumni_deleteMany);
console.log(data.siswa_deleteMany);
console.log(data.guru_deleteMany);
console.log(data.kelas_deleteMany);
console.log(data.jurusan_deleteMany);
console.log(data.mataPelajaran_deleteMany);
console.log(data.pengguna_deleteMany);

// Or, you can use the `Promise` API.
resetDatabase().then((response) => {
  const data = response.data;
  console.log(data.nilai_deleteMany);
  console.log(data.jadwal_deleteMany);
  console.log(data.prestasi_deleteMany);
  console.log(data.kehadiran_deleteMany);
  console.log(data.pengumuman_deleteMany);
  console.log(data.alumni_deleteMany);
  console.log(data.siswa_deleteMany);
  console.log(data.guru_deleteMany);
  console.log(data.kelas_deleteMany);
  console.log(data.jurusan_deleteMany);
  console.log(data.mataPelajaran_deleteMany);
  console.log(data.pengguna_deleteMany);
});
```

### Using `ResetDatabase`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, resetDatabaseRef } from '@uassiakad/connector';


// Call the `resetDatabaseRef()` function to get a reference to the mutation.
const ref = resetDatabaseRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = resetDatabaseRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.nilai_deleteMany);
console.log(data.jadwal_deleteMany);
console.log(data.prestasi_deleteMany);
console.log(data.kehadiran_deleteMany);
console.log(data.pengumuman_deleteMany);
console.log(data.alumni_deleteMany);
console.log(data.siswa_deleteMany);
console.log(data.guru_deleteMany);
console.log(data.kelas_deleteMany);
console.log(data.jurusan_deleteMany);
console.log(data.mataPelajaran_deleteMany);
console.log(data.pengguna_deleteMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.nilai_deleteMany);
  console.log(data.jadwal_deleteMany);
  console.log(data.prestasi_deleteMany);
  console.log(data.kehadiran_deleteMany);
  console.log(data.pengumuman_deleteMany);
  console.log(data.alumni_deleteMany);
  console.log(data.siswa_deleteMany);
  console.log(data.guru_deleteMany);
  console.log(data.kelas_deleteMany);
  console.log(data.jurusan_deleteMany);
  console.log(data.mataPelajaran_deleteMany);
  console.log(data.pengguna_deleteMany);
});
```

