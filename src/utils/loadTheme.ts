export async function loadTheme(themeName: string) {
  try {
    await import(`primereact/resources/themes/${themeName}/theme.css`);
  } catch (error) {
    console.error(`Failed to load theme: ${themeName}`, error);
  }
} 