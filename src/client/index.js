import Game from "./game";
import * as api from './api';

Game(document.getElementById("game"));
api.emitReady();