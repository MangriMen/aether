import type {
  LoaderManifest,
  MappedLoaderManifest,
} from '@/entities/minecraft';

export const loaderManifestToMapped = (
  manifest: LoaderManifest,
): MappedLoaderManifest => {
  return {
    gameVersions: manifest.gameVersions.reduce<
      MappedLoaderManifest['gameVersions']
    >((acc, version) => {
      acc[version.id] = version;
      return acc;
    }, {}),
  };
};
