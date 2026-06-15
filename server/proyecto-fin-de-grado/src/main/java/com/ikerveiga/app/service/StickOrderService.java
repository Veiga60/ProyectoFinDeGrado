package com.ikerveiga.app.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.OrderRepository;
import com.ikerveiga.app.dao.PlayerRepository;
import com.ikerveiga.app.dao.StickBladeRepository;
import com.ikerveiga.app.dao.StickFlexRepository;
import com.ikerveiga.app.dao.StickGripRepository;
import com.ikerveiga.app.dao.StickKickpointRepository;
import com.ikerveiga.app.dao.StickLengthRepository;
import com.ikerveiga.app.dao.StickModelRepository;
import com.ikerveiga.app.dao.StickOrderRepository;
import com.ikerveiga.app.dao.StickWeightRepository;
import com.ikerveiga.app.entity.Order;
import com.ikerveiga.app.entity.Player;
import com.ikerveiga.app.entity.StickBlade;
import com.ikerveiga.app.entity.StickFlex;
import com.ikerveiga.app.entity.StickGrip;
import com.ikerveiga.app.entity.StickKickpoint;
import com.ikerveiga.app.entity.StickLength;
import com.ikerveiga.app.entity.StickModel;
import com.ikerveiga.app.entity.StickOrder;
import com.ikerveiga.app.entity.StickWeight;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class StickOrderService {

    private StickOrderRepository stickOrderDAO;
    private PlayerRepository playerDAO;
    private OrderRepository orderDAO;
    private StickModelRepository stickModelDAO;
    private StickLengthRepository stickLengthDAO;
    private StickWeightRepository stickWeightDAO;
    private StickBladeRepository stickBladeDAO;
    private StickFlexRepository stickFlexDAO;
    private StickKickpointRepository stickKickpointDAO;
    private StickGripRepository stickGripDAO;

    @Autowired
    public StickOrderService(StickOrderRepository stickOrderDAO, PlayerRepository playerDAO, OrderRepository orderDAO,
            StickModelRepository stickModelDAO, StickLengthRepository stickLengthDAO,
            StickWeightRepository stickWeightDAO, StickBladeRepository stickBladeDAO, StickFlexRepository stickFlexDAO,
            StickKickpointRepository stickKickpointDAO, StickGripRepository stickGripDAO) {
        this.stickOrderDAO = stickOrderDAO;
        this.playerDAO = playerDAO;
        this.orderDAO = orderDAO;
        this.stickModelDAO = stickModelDAO;
        this.stickLengthDAO = stickLengthDAO;
        this.stickWeightDAO = stickWeightDAO;
        this.stickBladeDAO = stickBladeDAO;
        this.stickFlexDAO = stickFlexDAO;
        this.stickKickpointDAO = stickKickpointDAO;
        this.stickGripDAO = stickGripDAO;
    }

    public List<StickOrder> getOrders() {
        List<StickOrder> orders = stickOrderDAO.findAll();

        return orders;
    }

    public void createStickOrder(long playerId, String phoneNumber, long orderId, long modelId,
            long lengthId, long weightId, String side, long bladeId, long flexId, long kickpointId, long gripId,
            int amount, String nametag) {

        Player player = playerDAO.findById(playerId);
        Order order = orderDAO.findById(orderId);
        StickModel model = stickModelDAO.findById(modelId);
        StickLength length = stickLengthDAO.findById(lengthId);
        StickWeight weight = stickWeightDAO.findById(weightId);
        StickBlade blade = stickBladeDAO.findById(bladeId);
        StickFlex flex = stickFlexDAO.findById(flexId);
        StickKickpoint kickpoint = stickKickpointDAO.findById(kickpointId);
        StickGrip grip = stickGripDAO.findById(gripId);

        if (LocalDateTime.now().isAfter(order.getDeadline())) {
            throw new RuntimeException("The order is expired");
        }

        StickOrder stickOrder = new StickOrder(player, phoneNumber, order, model, length, weight, side, blade, flex,
                kickpoint, grip, amount, nametag);

        stickOrderDAO.save(stickOrder);
    }

    public List<StickOrder> getStickOrdersFromOrder(long orderId) {
        Order order = orderDAO.findById(orderId);

        if (order == null) {
            throw new RuntimeException("Order not found");
        }

        List<StickOrder> stickOrders = stickOrderDAO.findByOrder(order);

        return stickOrders;
    }

    public void exportToExcel(List<Long> stickOrdersIDs, HttpServletResponse response) throws IOException {

        List<StickOrder> stickOrders = stickOrderDAO.findAllById(stickOrdersIDs);

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Pedidos sticks");
        HSSFRow row = sheet.createRow(0);

        row.createCell(0).setCellValue("Nombre");
        row.createCell(1).setCellValue("Apellidos");
        row.createCell(2).setCellValue("Nº Tfno");
        row.createCell(3).setCellValue("Modelo");
        row.createCell(4).setCellValue("Longitud");
        row.createCell(5).setCellValue("Peso");
        row.createCell(6).setCellValue("Lado");
        row.createCell(7).setCellValue("Pala");
        row.createCell(8).setCellValue("Flex");
        row.createCell(9).setCellValue("Kickpoint");
        row.createCell(10).setCellValue("Grip");
        row.createCell(11).setCellValue("Cantidad");
        row.createCell(12).setCellValue("Nametag");

        int dataRowIndex = 1;

        for (StickOrder stickOrder : stickOrders) {
            HSSFRow dataRow = sheet.createRow(dataRowIndex);
            dataRow.createCell(0).setCellValue(stickOrder.getPlayer().getName());
            dataRow.createCell(1)
                    .setCellValue(stickOrder.getPlayer().getLastName1() + ' ' + stickOrder.getPlayer().getLastName2());
            dataRow.createCell(2).setCellValue(stickOrder.getPhoneNumber());
            dataRow.createCell(3).setCellValue(stickOrder.getModel().getDescription());
            dataRow.createCell(4).setCellValue(stickOrder.getLength().getDescription());
            dataRow.createCell(5).setCellValue(stickOrder.getWeight().getDescription());
            dataRow.createCell(6).setCellValue(stickOrder.getSide());
            dataRow.createCell(7).setCellValue(stickOrder.getBlade().getDescription());
            dataRow.createCell(8).setCellValue(stickOrder.getFlex().getDescription());
            dataRow.createCell(9).setCellValue(stickOrder.getKickpoint().getDescription());
            dataRow.createCell(10).setCellValue(stickOrder.getGrip().getDescription());
            dataRow.createCell(11).setCellValue(stickOrder.getAmount());
            dataRow.createCell(12).setCellValue(stickOrder.getNametag());

            dataRowIndex++;
        }

        ServletOutputStream ops = response.getOutputStream();
        workbook.write(ops);
        workbook.close();
        ops.close();
    }
}
