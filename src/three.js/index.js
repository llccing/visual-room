import Cabinet from './CabinetFactory'
import Server from './serverFactory'
import SceneFactory from './SceneFactory'

SceneFactory.Cabinet = Cabinet;
SceneFactory.Server = Server;

export default SceneFactory