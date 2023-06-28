declare module "stream-to-blob" {
  function streamToBlob(
    stream: NodeJS.ReadableStream,
    mimeType?: string
  ): Promise<Blob>;
  export = streamToBlob;
}
