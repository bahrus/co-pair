export async function getDirectoryContents() {
  try {
    // Prompt user to select a directory
    const directoryHandle = await window.showDirectoryPicker();
    getDirectoryContentsFromHandle(directoryHandle, []);
    const parent = document.createElement("details");
    await runApproach1(directoryHandle, parent, []);
    document.getElementById("target_for_approach_1").appendChild(parent);
  } catch (error) {
    console.error("Error accessing directory:", error);
  }
}

export async function getDirectoryContentsFromHandle(directoryHandle, path = []) {
  // Iterate through the directory's contents
  const method1loc = document.getElementById("target_for_approach_1");
  for await (const [name, handle] of directoryHandle.entries()) {
    if (handle.kind === "file") {
    } else if (handle.kind === "directory") {
      getDirectoryContentsFromHandle(handle, [...path, name]); // Recursively get contents of subdirectory
    }
  }
}
export async function runApproach1(directoryHandle, parent, path = []) {
  const summary = document.createElement("summary");
  summary.textContent = directoryHandle.name;
  parent.appendChild(summary);
  for await (const [name, handle] of directoryHandle.entries()) {
    if (handle.kind === "directory") {
      const details = document.createElement("details");
      details.classList.add("left-indentation");
      await runApproach1(handle, details, [...path, name]);
      parent.appendChild(details);
    } else if (handle.kind === "file") {
      const fileDiv = document.createElement("div");
      fileDiv.classList.add("left-indentation");
      fileDiv.textContent = `File: ${name}`;
      parent.appendChild(fileDiv);
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      parent.appendChild(deleteButton);
      deleteButton.onclick = async () => {
        try {
          await handle.remove();
          fileDiv.remove();
          deleteButton.remove();
        } catch (error) {
          console.error("Error deleting file:", error);
        }
      };
      const appendTextButton = document.createElement("button");
      appendTextButton.textContent = 'Append Text "world"';
      parent.appendChild(appendTextButton);
      appendTextButton.onclick = async () => {
        try {
          const writable = await handle.createWritable({
            keepExistingData: true,
          });
          const file = await handle.getFile();
          await writable.seek(file.size);
          await writable.write("world");
          await writable.close();
        } catch (error) {
          console.error("Error appending text:", error);
        }
      };
    }
  }
}
export async function runApproach2(directoryHandle, path = []) {
  const arr = await Array.fromAsync(directoryHandle.entries());
  console.log({ arr });
  const html = `<details>
                <summary>${directoryHandle.name}</summary>
                ${(
                  await Promise.all(
                    arr.map(async ([name, handle]) => {
                      if (handle.kind === "file") {
                        console.log(`File: ${path.join("/")}/${name}`);
                        // return `<div style="margin-left: 20px;">File: ${name}</div>`;
                        return `<div class="left-indentation">File: ${name}</div>`;
                      } else if (handle.kind === "directory") {
                        console.log(`Directory: ${path.join("/")}/${name}`);
                        const subHtml = await runApproach2(handle, [
                          ...path,
                          name,
                        ]);
                        return String.raw`<details class="left-indentation">
                                        <summary>${name}</summary>
                                        ${subHtml}
                                    </details>`;
                      }
                      return "";
                    })
                  )
                ).join("")}
                </details>
                `;

  return html;
}
