import { Redirect, Switch, Route } from "react-router-dom";
import CurrentForecast from "./CurrentForecast";
import FiveDayTemps from "./FiveDayTemps";

function RouteHandler(props) {
    return (
        <Switch>
            <Route path='/current-forecast'>
                <CurrentForecast locationObj={props.locationObj} />
            </Route>
            <Route path='/5-day-temperatures'>
                <FiveDayTemps locationObj={props.locationObj} />
            </Route>
            <Route path='/'>
                <Redirect to='/current-forecast' />
            </Route>
        </Switch>
    )
}

export default RouteHandler;