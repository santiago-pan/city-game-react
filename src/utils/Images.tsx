import images from './../assets/images';

export type ImagesType = {
  roofs: { [key: string]: HTMLImageElement };
  floors: { [key: string]: HTMLImageElement };
  basements: { [key: string]: HTMLImageElement };
  planes: { [key: string]: HTMLImageElement };
  greens: { [key: string]: HTMLImageElement };
};

async function Images(): Promise<ImagesType> {
  
  const roofs = await loadRoofs();
  const floors = await loadFloors();
  const basements = await loadBasements();
  const planes = await loadPlanes();
  const greens = await loadGreenBuildings();

  async function loadRoofs() {
    return {
      FLOOR_ROOF_A: await loadImage(images.ic_floor_roof_type_a),
      FLOOR_ROOF_B: await loadImage(images.ic_floor_roof_type_b),
      FLOOR_ROOF_C: await loadImage(images.ic_floor_roof_type_c),
      FLOOR_ROOF_D: await loadImage(images.ic_floor_roof_type_d),
      FLOOR_ROOF_E: await loadImage(images.ic_floor_roof_type_e),
      FLOOR_ROOF_F: await loadImage(images.ic_floor_roof_type_f),
    };
  }

  async function loadFloors() {
    return {
      FLOOR_A: await loadImage(images.ic_floor_type_a),
      FLOOR_B: await loadImage(images.ic_floor_type_b),
      FLOOR_C: await loadImage(images.ic_floor_type_c),
      FLOOR_D: await loadImage(images.ic_floor_type_d),
    };
  }

  async function loadBasements() {
    return {
      FLOOR_BASEMENT_A: await loadImage(images.ic_floor_basement_type_a),
      FLOOR_BASEMENT_B: await loadImage(images.ic_floor_basement_type_b),
      FLOOR_BASEMENT_C: await loadImage(images.ic_floor_basement_type_c),
      FLOOR_BASEMENT_D: await loadImage(images.ic_floor_basement_type_d),
      FLOOR_BASEMENT_E: await loadImage(images.ic_floor_basement_type_e),
    };
  }

  async function loadPlanes() {
    return {
      PLANE_A: await loadImage(images.ic_plane_type_a),
      PLANE_B: await loadImage(images.ic_plane_type_b),
      PLANE_C: await loadImage(images.ic_plane_type_c),
    };
  }

  async function loadGreenBuildings() {
    return {
      GREEN_A: await loadImage(images.ic_green_church),
      GREEN_B: await loadImage(images.ic_green_hospital),
      GREEN_C: await loadImage(images.ic_green_school),
    };
  }

  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = function() {
        resolve(image);
      };
      image.src = src;
    });
  }

  return { roofs, floors, basements, planes, greens };
}

export default Images;
