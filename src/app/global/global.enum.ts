export class GlobalConstants {
    public static COLORS = {
        domain: ['#0D3B66', '#DB504A', '#E8D284', '#8AB0AB', '#E3B505',
            '#2C4251', '#289AC0', '#110B11', '#EBD8BB', '#82DBFF',
            '#FF919E', '#FFF791', '#6A7375', '#2DB5C2', '#E88886']
    };

    public static SINGLE_COLOR = {
        domain: ['#3F51B5']
    };
    public static MONTHS_MMM = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    public static ADMIN_VIEWS = [{
        viewCode: 'LOAD_MASTER_DATA',
        viewTitle: 'Load Master Data',
        viewType: 'view',
        isMenu: true,
        isToolbar: false,
        iconClass: 'fas fa-upload',
        displayOrder: 1,
        viewRoute: 'home/load-data'
    }];
}

export enum Role {
    ADMIN = 'ADMIN',
    TRACKER_USER = 'TRACKER_USER'
}
