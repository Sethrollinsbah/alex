import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
  const r2 = await platform?.env.MY_BUCKET;

  // Return content for each file, JSON files are parsed accordingly
  // const res = await getContent(r2, 'app.svx'); // Markdown (text)
  return {};
};

async function getContent(r2: R2Bucket, fileName: string, json: boolean = false) {
  try {
    console.log(`Fetching file: ${fileName}`);

    // Fetch the file from R2
    const file = await r2.get(fileName);

    // Check if the file exists and has a body
    if (!file || !file.body) {
      // Gracefully handle empty or missing body
      console.warn(`File '${fileName}' not found or body is empty.`);
      return {
        error: true,
        message: `File '${fileName}' not found or body is empty.`,
        fileName: fileName
      };
    }

    console.log(`Successfully fetched file: ${fileName}`);

    // Read the body of the file (which is a ReadableStream)
    const reader = file.body.getReader();
    const decoder = new TextDecoder(); // Used to convert binary to string
    let fileContent = ''; // Initialize fileContent as an empty string
    let done = false;

    // Loop through the stream and read the data
    while (!done) {
      const { value, done: readDone } = await reader.read();
      done = readDone;
      fileContent += decoder.decode(value, { stream: true });
    }

    // If not JSON, return raw content (e.g., for Markdown or text)
    return fileContent;
  } catch (error) {
    // Gracefully handle unexpected errors
    console.error(`Error getting content from file '${fileName}': ${error.message}`);
    return {
      error: true,
      message: `Unexpected error getting content from file '${fileName}': ${error.message}`,
      fileName: fileName
    };
  }
}
