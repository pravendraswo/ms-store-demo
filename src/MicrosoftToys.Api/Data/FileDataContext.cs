using System.IO;

namespace MicrosoftToys.Api.Data
{
    /// <summary>
    /// Handles file I/O for data storage.
    /// </summary>
    public class FileDataContext
    {
        public static string ReadFile(string path)
        {
            return File.Exists(path) ? File.ReadAllText(path) : string.Empty;
        }

        public static void WriteFile(string path, string content)
        {
            File.WriteAllText(path, content);
        }
    }
}
