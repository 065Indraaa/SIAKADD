# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createPengguna, updatePengguna, deletePengguna, createGuru, updateGuru, deleteGuru, createSiswa, updateSiswa, updateSiswaPeminatan, deleteSiswa } from '@uassiakad/connector';


// Operation CreatePengguna:  For variables, look at type CreatePenggunaVars in ../index.d.ts
const { data } = await CreatePengguna(dataConnect, createPenggunaVars);

// Operation UpdatePengguna:  For variables, look at type UpdatePenggunaVars in ../index.d.ts
const { data } = await UpdatePengguna(dataConnect, updatePenggunaVars);

// Operation DeletePengguna:  For variables, look at type DeletePenggunaVars in ../index.d.ts
const { data } = await DeletePengguna(dataConnect, deletePenggunaVars);

// Operation CreateGuru:  For variables, look at type CreateGuruVars in ../index.d.ts
const { data } = await CreateGuru(dataConnect, createGuruVars);

// Operation UpdateGuru:  For variables, look at type UpdateGuruVars in ../index.d.ts
const { data } = await UpdateGuru(dataConnect, updateGuruVars);

// Operation DeleteGuru:  For variables, look at type DeleteGuruVars in ../index.d.ts
const { data } = await DeleteGuru(dataConnect, deleteGuruVars);

// Operation CreateSiswa:  For variables, look at type CreateSiswaVars in ../index.d.ts
const { data } = await CreateSiswa(dataConnect, createSiswaVars);

// Operation UpdateSiswa:  For variables, look at type UpdateSiswaVars in ../index.d.ts
const { data } = await UpdateSiswa(dataConnect, updateSiswaVars);

// Operation UpdateSiswaPeminatan:  For variables, look at type UpdateSiswaPeminatanVars in ../index.d.ts
const { data } = await UpdateSiswaPeminatan(dataConnect, updateSiswaPeminatanVars);

// Operation DeleteSiswa:  For variables, look at type DeleteSiswaVars in ../index.d.ts
const { data } = await DeleteSiswa(dataConnect, deleteSiswaVars);


```