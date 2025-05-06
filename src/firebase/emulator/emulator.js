// util/emulator.js
/**
 * Comprueba si hay algo escuchando en http://host:port
 * (un HEAD basta para saber si el puerto está abierto).
 */
async function isEmulatorUp(host = '127.0.0.1', port, timeout = 1500) {
    const url = `http://${host}:${port}/`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
        await fetch(url, { method: 'HEAD', signal: controller.signal });
        return true;
    } catch {
        return false;
    } finally {
        clearTimeout(timer);
    }
}

/**
 * Recorre un array de servicios y, para cada uno,
 * si detecta el emulador, ejecuta su callback de conexión.
 *
 * services: Array<{
 *   name: string,                       // para logs
 *   host?: string,                      // por defecto 127.0.0.1
 *   port: number,                       // puerto del emulador
 *   connect: () => void | Promise<void> // callback que llama a connectXXXEmulator
 * }>
 */
export async function connectEmulatorsIfAvailable(services) {
    const result = await Promise.all(
        services.map(async ({ name, host = '127.0.0.1', port, connect }) => {
            const up = await isEmulatorUp(host, port);
            if (up) {
                await connect();
                console.info(`[Emulator] conectado a ${name} en ${host}:${port}`);
            } else {
                console.info(`[Emulator] ${name} NO detectado en ${host}:${port}`);
            }
        })
    );
    return result;
}
