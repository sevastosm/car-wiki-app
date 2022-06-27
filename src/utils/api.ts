export async function getAllManufactures(page: number) {
  try {
    const result = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=${page}`
    );
    const data: any = await result.json();
    return data;
  } catch (e) {
    return null;
  }
}

export async function GetMakeForManufacturer(id: number) {
  console.log("GetMakeForManufacturer");
  try {
    const result = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakeForManufacturer/${id}?format=json`
    );
    const data: any = await result.json();
    return await Promise.all(
      data.Results.map(async (d: any) => {
        const models = GetModelsForMakeId(d.Make_ID);
        return { ...d, models };
      })
    );
  } catch (e) {
    return null;
  }
}

export async function GetModelsForMakeId(id: string) {
  try {
    const result = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${id}?format=json`
    );
    const data: any = await result.json();
    return data;
  } catch (e) {
    return null;
  }
}
